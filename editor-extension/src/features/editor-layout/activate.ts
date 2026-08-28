/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview Reading the live tab groups and projecting them into the pages.
 *
 * The shaping and both directions of the query are in `../../seat/editor-layout.ts`,
 * which imports no `vscode` and is exercised without a workbench. What is here is
 * the reading of the tab groups and the projection itself.
 */
import * as vscode from 'vscode';
import {
	arrangementFrom,
	type LayoutGroup,
	type LayoutTab,
	type TabKind,
} from '../../seat/editor-layout.ts';
import { recordObservation, recordSweep } from '../../seat/observation-store.ts';
import { PROCESS_ID_TIMEOUT_MS } from '../../seat/terminal-pids.ts';
import { readProcess } from '../../seat/window-identity.ts';
import { readSeatLookup, readSeatTerminals } from '../agent-tree/columns.ts';
import { arrangedResponse } from '../../../../tools/lib/editor-arrangement.ts';
import { deferCommits } from '../../../../tools/lib/page-commit-queue.ts';
import { rootsHere } from '../../../../repo/roots/roots.ts';

/** This feature's name in the observation record, and in `extension.ts`'s list. */
const FEATURE = 'editor-layout';

/**
 * How long a burst of tab changes is allowed to settle before the arrangement is projected.
 *
 * Alan rearranges constantly, and dragging one tab raises several change events.
 * The projection costs a `ps` sweep — the seat names come from the same resolution
 * the rename and the panel use — so a burst must cost one projection rather than
 * one each.
 */
const SETTLE_MS = 250;

let output: vscode.OutputChannel;
let timer: ReturnType<typeof setTimeout> | undefined;
let windowProcess: string;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	output = vscode.window.createOutputChannel('Ops Editor Layout');
	context.subscriptions.push(output);
	windowProcess = await readProcess(process.pid);
	// THIS PROCESS COMMITS NOW, so it takes the same batching the page query service takes:
	// writes land on disk at once and are committed on a timer, and on exit. Idempotent, and
	// declared here rather than at the entry point because this is what writes. Without it an
	// arrangement would be a commit per settled burst, and Alan rearranges constantly.
	deferCommits();
	output.appendLine('activated; projecting the arrangement into the pages');

	// Not awaited, for the reason the rename feature's first sweep is not: this is
	// work activation triggers rather than part of being ready.
	schedule('activate');

	context.subscriptions.push(
		vscode.window.tabGroups.onDidChangeTabs(() => schedule('tabs')),
		vscode.window.tabGroups.onDidChangeTabGroups(() => schedule('groups')),
		// A terminal becoming a seat does not change any tab, so the tab events above
		// never fire for it. This is what puts a newly named seat into the pages.
		vscode.window.onDidOpenTerminal(() => schedule('terminal-open')),
		vscode.window.onDidCloseTerminal(() => schedule('terminal-close')),
		vscode.commands.registerCommand('opsEditorLayout.writeNow', () => write('manual'))
	);
}

/** Coalesces a burst of changes into one projection. */
function schedule(trigger: string): void {
	if (timer !== undefined) { clearTimeout(timer); }
	timer = setTimeout(() => {
		timer = undefined;
		void write(trigger);
	}, SETTLE_MS);
}

async function write(trigger: string): Promise<undefined> {
	try {
		const groups = await readGroups();
		const tabs = groups.reduce((n, g) => n + g.tabs.length, 0);
		const seats = groups.reduce((n, g) => n + g.tabs.filter((t) => t.seat !== undefined).length, 0);
		output.appendLine(
			`[${trigger}] ${groups.length} group(s), ${tabs} tab(s), ${seats} seat(s)`
		);
		await writePages(groups, trigger);
		// THE COUNTS ONLY. The counts are what a verifier needs from the record, and
		// restating the whole arrangement here would stand a second copy of it beside
		// the pages that hold it.
		recordObservation(FEATURE, {
			outcome: 'ok',
			counts: { groups: groups.length, tabs, seats },
		});
	} catch (err) {
		output.appendLine(`[${trigger}] reading the arrangement failed: ${String(err)}`);
		recordObservation(FEATURE, { outcome: 'failed', failure: String(err) });
	}
	return undefined;
}

/**
 * The same arrangement again as pages, landed here.
 *
 * STILL JUDGED. This used to POST to the page query service because the gates lived in another
 * repository and a write from this bundle would have been a write nothing judged. The gates are
 * in akasha now and this bundle carries them: `arrangedResponse` is the very function the
 * service's own `/editor-arrangement` route calls, so the same `judgedLanding` runs and each
 * page is resolved from its page type's own `files:` declaration.
 *
 * WHY NOT OVER HTTP ANY MORE. The service answers on one thread for every caller on the
 * workstation. This projection measured about 1.2 seconds a call there and fired every few
 * seconds while Alan rearranged, which was among the largest single loads on it.
 *
 * WHY NOT A SPAWNED VERB. The verb this used to run named the four memory folders itself. The
 * page types moved to `pages/{page-type-slug}/` and the literals did not, so every arrangement
 * landed where nothing reads. A caller that states an arrangement and never a path cannot drift
 * from the declaration again.
 *
 * A FAILURE IS REPORTED AND NOT RAISED. This projection is one of several triggers, and the next
 * tab change runs it again, so a single refused landing is not worth failing the feature over.
 */
async function writePages(groups: readonly LayoutGroup[], trigger: string): Promise<void> {
	const arrangement = arrangementFrom(groups, windowProcess);
	try {
		const { body, status } = arrangedResponse(rootsHere(), JSON.parse(JSON.stringify(arrangement)));
		output.appendLine(`[${trigger}] pages: ${status} ${JSON.stringify(body)}`);
	} catch (err) {
		output.appendLine(`[${trigger}] pages failed: ${String(err)}`);
	}
	return Promise.resolve();
}

/** The live arrangement, with each terminal tab's seat resolved through the process tree. */
async function readGroups(): Promise<readonly LayoutGroup[]> {
	// The seat name is resolved rather than read off the tab's label, for the same
	// reason nothing else here trusts a label: it is a display title, and a tab
	// nobody has focused may not carry the right one yet.
	const seatByTerminal = new Map<vscode.Terminal, string>();
	// The shell process of every terminal, seat or not, which is what a terminal page is keyed on.
	const processByTerminal = new Map<vscode.Terminal, string>();
	const { seatNames, psRows, tmuxClients } = await readSeatLookup();
	if (psRows.length > 0) {
		const { seats, counted, ms, pidByTerminal } = await readSeatTerminals(seatNames, psRows, tmuxClients);
		// THE THIRD SWEEP SITE, and it pays the same bound as the other two. This one
		// runs on every tab change rather than on a poll, so a window nobody is
		// rearranging records it once and then says nothing more about it.
		recordSweep(FEATURE, { ...counted, boundMs: PROCESS_ID_TIMEOUT_MS, ms, trigger: 'write' });
		for (const seat of seats) { seatByTerminal.set(seat.terminal, seat.name); }
		await Promise.all(
			[...pidByTerminal].map(async ([terminal, pid]) => {
				processByTerminal.set(terminal, await readProcess(pid));
			})
		);
	}

	const active = vscode.window.tabGroups.activeTabGroup;
	return vscode.window.tabGroups.all.map((group) => ({
		column: group.viewColumn,
		active: group === active,
		tabs: group.tabs.map((tab) => describeTab(tab, seatByTerminal, processByTerminal)),
	}));
}

function describeTab(
	tab: vscode.Tab,
	seatByTerminal: ReadonlyMap<vscode.Terminal, string>,
	processByTerminal: ReadonlyMap<vscode.Terminal, string>
): LayoutTab {
	const input: unknown = tab.input;
	const base = { label: tab.label, active: tab.isActive };

	if (input instanceof vscode.TabInputTerminal) {
		// `TabInputTerminal.terminal` is this fork's addition and is what makes the
		// tab-to-terminal join answerable at all; matching on the label is not a
		// substitute, since the rename feature next door changes it under this.
		const terminal = input.terminal;
		const seat = terminal === undefined ? undefined : seatByTerminal.get(terminal);
		const running = terminal === undefined ? undefined : processByTerminal.get(terminal);
		return {
			...base,
			kind: 'terminal',
			...(seat === undefined ? {} : { seat }),
			...(running === undefined ? {} : { process: running }),
		};
	}
	if (input instanceof vscode.TabInputText) {
		return { ...base, kind: 'text', uri: input.uri.toString() };
	}
	if (input instanceof vscode.TabInputNotebook) {
		return { ...base, kind: 'notebook', uri: input.uri.toString() };
	}
	if (input instanceof vscode.TabInputTextDiff || input instanceof vscode.TabInputNotebookDiff) {
		return { ...base, kind: 'diff', uri: input.modified.toString() };
	}
	if (input instanceof vscode.TabInputWebview) {
		return { ...base, kind: 'webview' };
	}
	// A kind this does not model is still IN the group, and saying so is the point:
	// a group's contents with the unmodelled tabs quietly missing would be wrong
	// rather than partial.
	return { ...base, kind: 'other' satisfies TabKind };
}
