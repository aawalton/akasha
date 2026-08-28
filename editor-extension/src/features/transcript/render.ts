import type { Entry, ToolCallEntry } from './model.ts';
import type { SubagentTranscript } from './sources.ts';

export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

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
	readonly subagents: ReadonlyMap<string, SubagentTranscript>;
	readonly subagentEntries: ReadonlyMap<string, readonly Entry[]>;
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
			parts.push(
				`<details class="thinking"><summary>thinking</summary>${block(entry.text)}</details>`
			);
		} else if (entry.kind === 'tool') {
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
