/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * The render model as HTML for the webview.
 *
 * DISCLOSURE IS NATIVE `<details>` RATHER THAN SCRIPTED. The fork deleted its
 * markdown preview extension (commit `8d21b8a`, "remove the 34 activating
 * extensions"), so this panel builds its own surface — and the cheapest correct
 * disclosure is the browser's own. It expands with no script, which means it
 * keeps working under the strictest content policy and survives the panel being
 * restored from a serialized state.
 */
import type { Entry, ToolCallEntry } from './model.ts';
import type { SubagentTranscript } from './sources.ts';

/**
 * Every string from a transcript is untrusted: it holds command output, file
 * contents and whatever a model wrote. It reaches the DOM only through here.
 */
export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * A result can be megabytes — a `Read` of a large file, or a build log. The
 * whole of it in the DOM costs the panel its responsiveness for text nobody
 * scrolls to, so it is cut with the cut announced. The head is kept rather than
 * the tail because a result is read from the top.
 */
const RESULT_CHAR_LIMIT = 20_000;

function clamp(value: string, limit: number): { text: string; clipped: number } {
	if (value.length <= limit) { return { text: value, clipped: 0 }; }
	return { text: value.slice(0, limit), clipped: value.length - limit };
}

function block(text: string, limit = RESULT_CHAR_LIMIT): string {
	const { text: kept, clipped } = clamp(text, limit);
	const body = escapeHtml(kept);
	const note =
		clipped > 0
			? `<div class="clipped">${clipped.toLocaleString()} more characters not shown</div>`
			: '';
	return `<pre>${body}</pre>${note}`;
}

function toolRow(entry: ToolCallEntry, subagentHtml: string): string {
	const subject =
		entry.subject === '' ? '' : `<span class="subject">${escapeHtml(entry.subject)}</span>`;
	const error = entry.isError ? ` <span class="error-flag">failed</span>` : '';
	const pending = entry.result === null ? ` <span class="pending">no result</span>` : '';

	const result =
		entry.result === null ? '' : `<div class="part-label">Result</div>${block(entry.result)}`;

	// `data-id` is what lets the panel reopen this row after re-rendering the
	// live tail. The call's own id is used because it is stable across renders,
	// where a positional index shifts as entries arrive.
	return [
		`<details class="tool${entry.isError ? ' is-error' : ''}" data-id="${escapeHtml(entry.toolUseId)}">`,
		`<summary><span class="tool-name">${escapeHtml(entry.name)}</span>${subject}${error}${pending}</summary>`,
		`<div class="tool-body">`,
		`<div class="part-label">Input</div>`,
		block(entry.input),
		result,
		subagentHtml,
		`</div>`,
		`</details>`,
	].join('');
}

function prose(text: string, className: string, label: string): string {
	return [
		`<div class="turn ${className}">`,
		`<div class="turn-label">${escapeHtml(label)}</div>`,
		`<div class="turn-text">${escapeHtml(text)}</div>`,
		`</div>`,
	].join('');
}

export interface RenderContext {
	/** Subagents keyed by the id of the call that ran each. */
	readonly subagents: ReadonlyMap<string, SubagentTranscript>;
	/** The subagent's own entries, resolved lazily by the caller. */
	readonly subagentEntries: ReadonlyMap<string, readonly Entry[]>;
	/** Guards against a subagent that somehow refers back to its own tree. */
	readonly depth: number;
}

const MAX_NESTING_DEPTH = 4;

export function renderEntries(entries: readonly Entry[], context: RenderContext): string {
	const parts: string[] = [];
	for (const entry of entries) {
		if (entry.kind === 'user') {
			parts.push(prose(entry.text, 'user', 'Alan'));
		} else if (entry.kind === 'assistant') {
			parts.push(prose(entry.text, 'assistant', 'Seat'));
		} else if (entry.kind === 'thinking') {
			// Behind a disclosure like a tool call: it is genuine content, but it is
			// long and it is not what the conversation reads as.
			parts.push(
				`<details class="thinking"><summary>thinking</summary>${block(entry.text)}</details>`
			);
		} else if (entry.kind === 'tool') {
			// Tested positively rather than as the remaining case: `ProseEntry` holds
			// BOTH prose kinds on one interface, so excluding them one at a time
			// never removes it from the union and the fallthrough stays untyped.
			parts.push(toolRow(entry, renderSubagent(entry, context)));
		}
	}
	return parts.join('\n');
}

function renderSubagent(entry: ToolCallEntry, context: RenderContext): string {
	const subagent = context.subagents.get(entry.toolUseId);
	if (subagent === undefined) { return ''; }
	if (context.depth >= MAX_NESTING_DEPTH) {
		return `<div class="clipped">subagent transcript nested too deeply to show</div>`;
	}

	const nested = context.subagentEntries.get(entry.toolUseId);
	const label = [subagent.agentType, subagent.description]
		.filter((part): part is string => part !== null && part !== '')
		.join(' — ');

	const body =
		nested === undefined
			? `<div class="clipped">subagent transcript not read</div>`
			: renderEntries(nested, { ...context, depth: context.depth + 1 });

	return [
		`<details class="subagent" data-id="sub-${escapeHtml(entry.toolUseId)}">`,
		`<summary>subagent${label === '' ? '' : `: ${escapeHtml(label)}`}</summary>`,
		`<div class="subagent-body">${body}</div>`,
		`</details>`,
	].join('');
}
