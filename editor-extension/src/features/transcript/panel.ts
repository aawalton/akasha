import * as fs from 'node:fs';
import * as vscode from 'vscode';
import { buildEntries, type Entry } from './model.ts';
import { renderEntries } from './render.ts';
import { readSubagents, readTranscriptText, seatTranscriptOf, type SubagentTranscript } from './sources.ts';

const POLL_INTERVAL_MS = 1_000;

export interface TranscriptTarget {
	readonly agentId?: string;
	readonly transcriptPath?: string;
	readonly title?: string;
}

interface RenderedState {
	transcriptPath: string | null;
	stableCount: number;
	lastSize: number;
}

function stableBoundary(entries: readonly Entry[]): number {
	for (let index = 0; index < entries.length; index += 1) {
		const entry = entries[index];
		if (entry !== undefined && entry.kind === 'tool' && entry.result === null) { return index; }
	}
	return entries.length;
}

function subagentEntriesFor(
	subagents: ReadonlyMap<string, SubagentTranscript>
): ReadonlyMap<string, readonly Entry[]> {
	const resolved = new Map<string, readonly Entry[]>();
	for (const [toolUseId, subagent] of subagents) {
		resolved.set(toolUseId, buildEntries(readTranscriptText(subagent.filePath)));
	}
	return resolved;
}

function renderSlice(
	entries: readonly Entry[],
	subagents: ReadonlyMap<string, SubagentTranscript>
): string {
	return renderEntries(entries, {
		subagents,
		subagentEntries: subagentEntriesFor(subagents),
		depth: 0,
	});
}

export function openTranscriptPanel(
	context: vscode.ExtensionContext,
	target: TranscriptTarget,
	viewColumn: vscode.ViewColumn = vscode.ViewColumn.Active
): vscode.WebviewPanel {
	const panel = vscode.window.createWebviewPanel(
		'opsTranscript',
		target.title ?? 'Seat transcript',
		viewColumn,
		{ enableScripts: true, retainContextWhenHidden: true }
	);

	panel.webview.html = shellHtml(panel.webview);

	const state: RenderedState = { transcriptPath: null, stableCount: 0, lastSize: -1 };

	const resolvePath = (): string | null => {
		if (target.agentId !== undefined) {
			return seatTranscriptOf(target.agentId)?.transcriptPath ?? null;
		}
		return target.transcriptPath ?? null;
	};

	const tick = (): undefined => {
		const transcriptPath = resolvePath();
		if (transcriptPath === null) {
			if (state.transcriptPath !== null) { return; }
			void panel.webview.postMessage({ kind: 'status', text: 'No transcript found for this seat.' });
			return;
		}

		let size: number;
		try {
			size = fs.statSync(transcriptPath).size;
		} catch {
			void panel.webview.postMessage({ kind: 'status', text: 'Transcript file is not readable.' });
			return;
		}

		const rotated = transcriptPath !== state.transcriptPath;
		if (!rotated && size === state.lastSize) { return; }

		if (rotated) {
			state.transcriptPath = transcriptPath;
			state.stableCount = 0;
			void panel.webview.postMessage({ kind: 'reset' });
		}
		state.lastSize = size;

		const entries = buildEntries(readTranscriptText(transcriptPath));
		const subagents = readSubagents(transcriptPath);
		const boundary = stableBoundary(entries);

		if (boundary > state.stableCount) {
			const settled = entries.slice(state.stableCount, boundary);
			void panel.webview.postMessage({ kind: 'append', html: renderSlice(settled, subagents) });
			state.stableCount = boundary;
		}

		const tail = entries.slice(state.stableCount);
		void panel.webview.postMessage({ kind: 'tail', html: renderSlice(tail, subagents) });
		void panel.webview.postMessage({ kind: 'status', text: '' });
	};

	tick();
	const timer = setInterval(tick, POLL_INTERVAL_MS);
	panel.onDidDispose(() => clearInterval(timer), null, context.subscriptions);
	return panel;
}

function nonce(): string {
	return Array.from({ length: 32 }, () =>
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
			Math.floor(Math.random() * 62)
		)
	).join('');
}

function shellHtml(webview: vscode.Webview): string {
	const scriptNonce = nonce();
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${scriptNonce}';">
<style>
	body {
		font-family: var(--vscode-editor-font-family, monospace);
		font-size: var(--vscode-editor-font-size, 13px);
		color: var(--vscode-editor-foreground);
		background: var(--vscode-editor-background);
		padding: 0 1rem 4rem;
		line-height: 1.5;
	}
	.turn { margin: 1.1rem 0; }
	.turn-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0.6;
		margin-bottom: 0.2rem;
	}
	.turn-text { white-space: pre-wrap; word-break: break-word; }
	.turn.user .turn-text {
		border-left: 2px solid var(--vscode-textLink-foreground);
		padding-left: 0.7rem;
	}
	details { margin: 0.25rem 0; }
	summary { cursor: pointer; opacity: 0.85; }
	summary:hover { opacity: 1; }
	.tool > summary { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.tool-name { font-weight: 600; }
	.subject { opacity: 0.7; margin-left: 0.5rem; }
	.error-flag { color: var(--vscode-errorForeground); margin-left: 0.5rem; }
	.pending { opacity: 0.55; margin-left: 0.5rem; font-style: italic; }
	.tool-body, .subagent-body { margin: 0.4rem 0 0.8rem 1rem; }
	.part-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0.5;
		margin-top: 0.4rem;
	}
	pre {
		white-space: pre-wrap;
		word-break: break-word;
		background: var(--vscode-textCodeBlock-background);
		padding: 0.5rem 0.7rem;
		margin: 0.2rem 0;
		border-radius: 3px;
		max-height: 26rem;
		overflow: auto;
	}
	.clipped { opacity: 0.55; font-style: italic; font-size: 0.85em; }
	.subagent { border-left: 2px solid var(--vscode-textSeparator-foreground, #8884); padding-left: 0.6rem; }
	.thinking > summary { opacity: 0.55; font-style: italic; }
	#status { opacity: 0.6; font-style: italic; padding: 0.5rem 0; }
</style>
</head>
<body>
<div id="settled"></div>
<div id="tail"></div>
<div id="status"></div>
<script nonce="${scriptNonce}">
(function () {
	const settled = document.getElementById("settled");
	const tail = document.getElementById("tail");
	const status = document.getElementById("status");

	// "Already at the end" needs a tolerance: the reader who has scrolled to the
	// bottom is rarely at exactly scrollHeight, and a strict test would stop
	// following for anyone a pixel short.
	const BOTTOM_SLACK_PX = 40;
	function atBottom() {
		const scrolled = window.scrollY + window.innerHeight;
		return scrolled >= document.body.scrollHeight - BOTTOM_SLACK_PX;
	}

	// Which disclosures the reader had open, so re-rendering the tail does not
	// shut them. Keyed by the call's own id, which is stable across re-renders.
	function openIds(root) {
		const ids = [];
		root.querySelectorAll("details[open][data-id]").forEach((el) => ids.push(el.dataset.id));
		return ids;
	}
	function restore(root, ids) {
		if (ids.length === 0) return;
		const wanted = new Set(ids);
		root.querySelectorAll("details[data-id]").forEach((el) => {
			if (wanted.has(el.dataset.id)) el.open = true;
		});
	}

	window.addEventListener("message", (event) => {
		const message = event.data;
		const follow = atBottom();

		if (message.kind === "reset") {
			settled.innerHTML = "";
			tail.innerHTML = "";
		} else if (message.kind === "append") {
			settled.insertAdjacentHTML("beforeend", message.html);
		} else if (message.kind === "tail") {
			const wasOpen = openIds(tail);
			tail.innerHTML = message.html;
			restore(tail, wasOpen);
		} else if (message.kind === "status") {
			status.textContent = message.text || "";
		}

		if (follow) window.scrollTo(0, document.body.scrollHeight);
	});
}());
</script>
</body>
</html>`;
}
