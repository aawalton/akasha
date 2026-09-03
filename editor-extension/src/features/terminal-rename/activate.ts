import * as vscode from 'vscode';
import { recordObservation, recordSweep } from '../../seat/observation-store.ts';
import { PROCESS_ID_TIMEOUT_MS, readProcessIds, tally } from '@akasha/editor-extension/terminal-pids';
import { loadPsRows, loadTmuxClients, seatNameForShellPid } from '@akasha/editor-extension/terminal-lookup';
import { agentIdsForSeatNames, seatNamesThatExist } from '@akasha/editor-extension/seat-page';
import { readSeatTurnColors, SEAT_SIDECAR_GLOB, seatDirs } from '../../seat/turn-color.ts';

import { syncTerminal } from './sync-terminal.ts';
import { lastAppliedByTerminal, lastColorByTerminal } from '@akasha/editor-extension/terminal-marks';

const FEATURE = 'terminal-rename';

const POLL_INTERVAL_MS = 1_000;

let output: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	output = vscode.window.createOutputChannel('Ops');
	context.subscriptions.push(output);
	output.appendLine(`activated; watching ${seatDirs().join(', ')}`);

	void syncAll('activate');

	const timer = setInterval(() => void syncAll('poll'), POLL_INTERVAL_MS);

	const sidecarWatchers = seatDirs().map((dir) =>
		vscode.workspace.createFileSystemWatcher(
			new vscode.RelativePattern(vscode.Uri.file(dir), SEAT_SIDECAR_GLOB)
		)
	);
	const pageWatchers = seatDirs().map((dir) =>
		vscode.workspace.createFileSystemWatcher(
			new vscode.RelativePattern(vscode.Uri.file(dir), '*.md')
		)
	);
	context.subscriptions.push(
		{ dispose: () => clearInterval(timer) },
		...sidecarWatchers.flatMap((seats) => [
			seats,
			seats.onDidChange(() => void syncAll('seat')),
			seats.onDidCreate(() => void syncAll('seat-new')),
			seats.onDidDelete(() => void syncAll('seat-gone')),
		]),
		...pageWatchers.flatMap((pages) => [
			pages,
			pages.onDidChange(() => void syncAll('seat-page')),
			pages.onDidCreate(() => void syncAll('seat-page')),
			pages.onDidDelete(() => void syncAll('seat-page')),
		]),
		vscode.window.onDidOpenTerminal(() => void syncAll('open')),
		vscode.window.onDidChangeActiveTerminal(() => void syncAll('focus')),
		vscode.window.onDidCloseTerminal((t) => {
			lastAppliedByTerminal.delete(t);
			lastColorByTerminal.delete(t);
		}),
		vscode.commands.registerCommand('agentTerminalName.syncNow', () => syncAll('manual'))
	);
}

// ONE SWEEP AT A TIME, BECAUSE THE LAST TO FINISH IS NOT THE ONE THAT READ LATEST.
//
// This is `features/agent-tree/activate.ts`'s guard, for this feature's version of the same defect.
// A sweep takes as long as `readProcessIds` waits on every terminal — bounded at
// PROCESS_ID_TIMEOUT_MS, which is longer than the 1s poll — and there are nine other triggers
// besides the poll: two file system watchers across every seat directory, three terminal events and
// a command. A seat page saved while a sweep is out starts a second one over the same terminals.
//
// The state they race for is `lastAppliedByTerminal` and `lastColorByTerminal` in
// `terminal-marks.ts`, which `syncTerminal` reads to decide whether a tab already carries the name
// and color it is about to be given, and writes after it applies one. Two sweeps interleaved read
// that map before either has written it, so both apply, and the tab ends up carrying whichever
// sweep finished last rather than whichever read the seat pages latest — a terminal named for a
// seat that has since moved, with no error anywhere, because nothing was wrong with either sweep.
//
// A trigger arriving mid-sweep waits for the sweep in flight. The poll comes round again in a
// second, so nothing is lost by not sweeping twice at once.
let sweeping: Promise<void> | undefined;

async function syncAll(trigger: string): Promise<void> {
	const inFlight = sweeping;
	if (inFlight !== undefined) {
		output.appendLine(`[${trigger}] a sweep is already in flight — waiting for it`);
		await inFlight;
		return;
	}
	const started = sweepOnce(trigger);
	sweeping = started;
	try {
		await started;
	} finally {
		sweeping = undefined;
	}
}

async function sweepOnce(trigger: string): Promise<void> {
	const terminals = vscode.window.terminals;
	if (terminals.length === 0) { return; }
	try {
		const psRows = await loadPsRows();
		if (psRows.length === 0) { return; }
		const [seatNames, tmuxClients] = await Promise.all([seatNamesThatExist(), loadTmuxClients()]);
		const began = Date.now();
		const readings = await readProcessIds(terminals);
		const ms = Date.now() - began;
		recordSweep(FEATURE, {
			...tally(readings),
			boundMs: PROCESS_ID_TIMEOUT_MS,
			ms,
			trigger,
		});
		const resolvedSeatNames = readings.map((reading) =>
			reading.outcome === 'read'
				? seatNameForShellPid(reading.pid, seatNames, psRows, tmuxClients)
				: undefined
		);
		let seatAgentIds: ReadonlyMap<string, string> = new Map<string, string>();
		let colors: ReadonlyMap<string, string> | undefined;
		try {
			seatAgentIds = await agentIdsForSeatNames(
				resolvedSeatNames.filter((name): name is string => name !== undefined)
			);
			colors = await readSeatTurnColors([...new Set(seatAgentIds.values())]);
		} catch (err) {
			output.appendLine(
				`[${trigger}] turn colors unread, every tab keeps the color it has: ${String(err)}`
			);
		}
		await Promise.all(
			readings.map((reading, index) =>
				syncTerminal(
					reading,
					resolvedSeatNames[index],
					index,
					terminals.length,
					seatAgentIds,
					psRows,
					colors,
					trigger,
					output
				)
			)
		);
		recordObservation(FEATURE, {
			outcome: 'ok',
			counts: { named: lastAppliedByTerminal.size, colored: lastColorByTerminal.size },
		});
	} catch (err) {
		output.appendLine(`[${trigger}] sweep failed: ${String(err)}`);
		recordObservation(FEATURE, { outcome: 'failed', failure: String(err) });
	}
}
