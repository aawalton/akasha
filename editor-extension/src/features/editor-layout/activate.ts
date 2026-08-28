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

const FEATURE = 'editor-layout';

const SETTLE_MS = 250;

let output: vscode.OutputChannel;
let timer: ReturnType<typeof setTimeout> | undefined;
let windowProcess: string;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	output = vscode.window.createOutputChannel('Ops Editor Layout');
	context.subscriptions.push(output);
	windowProcess = await readProcess(process.pid);
	deferCommits();
	output.appendLine('activated; projecting the arrangement into the pages');

	schedule('activate');

	context.subscriptions.push(
		vscode.window.tabGroups.onDidChangeTabs(() => schedule('tabs')),
		vscode.window.tabGroups.onDidChangeTabGroups(() => schedule('groups')),
		vscode.window.onDidOpenTerminal(() => schedule('terminal-open')),
		vscode.window.onDidCloseTerminal(() => schedule('terminal-close')),
		vscode.commands.registerCommand('opsEditorLayout.writeNow', () => write('manual'))
	);
}

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

async function readGroups(): Promise<readonly LayoutGroup[]> {
	const seatByTerminal = new Map<vscode.Terminal, string>();
	const processByTerminal = new Map<vscode.Terminal, string>();
	const { seatNames, psRows, tmuxClients } = await readSeatLookup();
	if (psRows.length > 0) {
		const { seats, counted, ms, pidByTerminal } = await readSeatTerminals(seatNames, psRows, tmuxClients);
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
	return { ...base, kind: 'other' satisfies TabKind };
}
