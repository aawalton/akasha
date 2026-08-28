/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { recordObservation, recordSweep } from '../../seat/observation-store.ts';
import { PROCESS_ID_TIMEOUT_MS, readProcessIds, tally } from '../../seat/terminal-pids.ts';
import { loadPsRows, loadTmuxClients, seatNameForShellPid } from '../../seat/terminal-lookup.ts';
import { agentIdsForSeatNames, seatNamesOnDisk } from '../../seat/seat-page.ts';
import { readSeatTurnColors, SEAT_SIDECAR_GLOB, seatDirs } from '../../seat/turn-color.ts';

import { syncTerminal } from './sync-terminal.ts';
import { lastAppliedByTerminal, lastColorByTerminal } from './terminal-marks.ts';

/** This feature's name in the observation record, and in `extension.ts`'s list. */
const FEATURE = 'terminal-rename';

/**
 * The floor under the watchers, in milliseconds.
 *
 * WITHOUT THIS THE FEATURE HAS NO PULSE OF ITS OWN. Naming runs on file-watcher events and on
 * focus, so a watcher that stops delivering leaves every tab holding the name its last sweep
 * applied, and no later event puts it right. Every other seat surface polls and heals itself on
 * its next tick; this is what gives this one the same floor.
 *
 * A SECOND, RATHER THAN THE TAB STRIP'S TEN. A sweep is a pid read and a `ps` snapshot, both
 * under a millisecond, and one call to the turn-colour verb at 30ms — about three hundredths of
 * a core. What it buys is that a name that has gone wrong is wrong for a second, which is too
 * short to be acted on.
 *
 * THE WATCHERS ARE STILL THE FAST PATH and this replaces none of them. An event sweeps at once;
 * this bounds only how long a MISSED event goes on being wrong.
 */
const POLL_INTERVAL_MS = 1_000;

let output: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	output = vscode.window.createOutputChannel('Ops');
	context.subscriptions.push(output);
	output.appendLine(`activated; watching ${seatDirs().join(', ')}`);

	// NOT AWAITED, which is the second half of the same lesson. The first sweep is
	// work this feature triggers rather than part of being ready, and every other
	// call site already fires it without waiting. Activation now finishes once the
	// watchers are registered, so no future change to what a sweep does can put
	// this feature's activation back on the critical path.
	void syncAll('activate');

	// LAID BEFORE THE WATCHERS, because a watcher that never starts is one of the cases this
	// covers, and a floor that goes down only after they succeed is not a floor.
	const timer = setInterval(() => void syncAll('poll'), POLL_INTERVAL_MS);

	// THE SEAT PAGES ARE THE STORE THIS FEATURE FOLLOWS. A hook writes a seat's turn state into the
	// sidecar beside its page every time a turn starts or ends — which is exactly the moment a tab
	// should change colour, and a moment no terminal event marks. Without this the colour is right
	// only as often as Alan happens to change focus, which is the state this feature was actually
	// in: the pattern still named `*.fast.yaml` after the sidecar was renamed, and the directory
	// still named `seats/` after most seat pages moved to `pages/seat/`. Both are resolved by
	// `seatDirs` and `SEAT_SIDECAR_GLOB` now, so the names live beside the reader that has to agree
	// with the harness rather than here.
	//
	// TWO PATTERNS, BECAUSE THE SIDECAR AND THE PAGE MARK DIFFERENT EVENTS. Turn state moves many
	// times over one seat's life while its page is written once, so the sidecar pattern fires while
	// a seat works and never on the seat arriving or leaving. The `.md` watcher marks those two, and
	// they are what `seatNamesOnDisk` answers with — a seat whose page has just landed resolves to
	// no name until something fires, so without this watcher its tab would sit unnamed until Alan
	// happened to look at another window.
	//
	// ONE WATCHER PER DIRECTORY AND PATTERN because a `RelativePattern` takes a single base. A
	// directory that is not there yet costs a watcher that never fires, which is what the far side
	// of a half-finished move looks like and is cheaper than deciding at startup which side to
	// trust.
	//
	// WATCHED RATHER THAN READ. What a change here triggers is a fresh ask of the harness, and the
	// harness is what resolves a state to a colour. The file that moved is the trigger, never the
	// answer.
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
		// STILL A TRIGGER, for a reason that outlived the limitation it was built
		// around. A terminal Alan opens himself and then runs `tr` in starts no
		// supervisor and writes no entry, so no watcher fires for it; his focus is
		// the only event that marks the moment it became resolvable. It no longer
		// bounds WHICH terminals get named — the sweep below covers all of them.
		vscode.window.onDidChangeActiveTerminal(() => void syncAll('focus')),
		vscode.window.onDidCloseTerminal((t) => {
			lastAppliedByTerminal.delete(t);
			lastColorByTerminal.delete(t);
		}),
		vscode.commands.registerCommand('agentTerminalName.syncNow', () => syncAll('manual'))
	);
}

/**
 * Names every terminal in the window that resolves to a seat.
 *
 * A WHOLE SWEEP, WHICH IS THE CHANGE #18955 MADE. This used to name only
 * `activeTerminal`, because the only rename primitive reachable from an
 * extension was `workbench.action.terminal.renameWithArg` — a
 * `registerActiveInstanceAction`, so naming any other terminal meant calling
 * `Terminal.show()` first, and that is what produced the xterm focus desync
 * (#11586) and active-tab clobbering (#11635) the feature was rebuilt to avoid.
 * The cost of that workaround was a backgrounded tab carrying no name until Alan
 * clicked it — which is half of why a tmux seat's tab read blank on 2026-08-13.
 *
 * `Terminal.rename` (this fork's addition, 13a7505) takes the terminal it is
 * called on and touches neither `setActiveInstance` nor `revealActiveEditor`, so
 * a sweep cannot move focus. That is structural rather than a promise, and it is
 * what makes naming every terminal available at all.
 */
async function syncAll(trigger: string): Promise<void> {
	const terminals = vscode.window.terminals;
	if (terminals.length === 0) { return; }
	// Every call site fires this without waiting for it, so it answers for its own
	// failures rather than handing anyone an unhandled rejection.
	try {
		const psRows = await loadPsRows();
		if (psRows.length === 0) { return; }
		// THE LOOKUP'S INPUTS READ ONCE FOR THE WHOLE SWEEP rather than per terminal. A seat's
		// page standing is what says a tmux session is a seat at all, and `loadTmuxClients`
		// answers with none where tmux is absent or its server is not running — which reads as
		// this window holding no seat terminal rather than as a fault.
		const [seatNames, tmuxClients] = await Promise.all([seatNamesOnDisk(), loadTmuxClients()]);
		// ONE BOUNDED READ FOR THE WHOLE WINDOW. Reading each terminal's pid against
		// its own deadline would make a window holding eight dead terminals pay the
		// bound eight times, which is the 2026-08-13 fault rather than a fix for it.
		//
		// TIMED, WHICH IT WAS NOT UNTIL NOW. This sweep pays the same 5000ms bound
		// `agent-tree`'s does and on the same window, and it was the one nothing
		// measured — `agent-tree` was timed in #18954 and this was taken for timed
		// along with it. A bound being paid here was invisible in every channel.
		const began = Date.now();
		const readings = await readProcessIds(terminals);
		const ms = Date.now() - began;
		recordSweep(FEATURE, {
			...tally(readings),
			boundMs: PROCESS_ID_TIMEOUT_MS,
			ms,
			trigger,
		});
		// THE SEAT NAMES ARE RESOLVED FOR THE WHOLE WINDOW BEFORE ANYTHING IS APPLIED, so
		// that the colour read below is one pass over the seats actually in this window
		// rather than one read per terminal. Aligned with `readings`, and so with
		// `terminals`: one entry each, in order.
		const resolvedSeatNames = readings.map((reading) =>
			reading.outcome === 'read'
				? seatNameForShellPid(reading.pid, seatNames, psRows, tmuxClients)
				: undefined
		);
		// WHICH AGENT IS IN EACH SEAT IS ASKED OF THE SEATS' OWN PAGES. It used to be read off
		// the supervisor's cache entry beside the seat name, which is a stamp nothing refreshes
		// and nothing removes — so a tab could be handed the id of an agent that finished, and
		// draw no colour while the panels drew that seat blue.
		//
		// KEYED BY AGENT ID BECAUSE THE ATTRIBUTE STORE IS. Two terminals attached to one
		// seat ask for one id, so the set is taken before the read rather than after it.
		//
		// BOTH READS UNDER ONE CATCH, RATHER THAN LEFT TO THE SWEEP'S OWN HANDLER, because these
		// failures want a different outcome from the sweep's. Neither the seat pages nor the
		// harness says anything about which seat is in which terminal, so the naming below still
		// has everything it needs and should run. `undefined` for the whole map is what carries
		// that through: it means the colours were not read, which is a different claim from their
		// having been read as none, and only the second may take a colour off a tab. A seat name
		// that simply has no page is the second — that seat has no agent — and it is left out of
		// the map below rather than making the map undefined.
		let seatAgentIds: ReadonlyMap<string, string> = new Map<string, string>();
		let colors: ReadonlyMap<string, string> | undefined;
		try {
			seatAgentIds = await agentIdsForSeatNames(
				resolvedSeatNames.filter((name): name is string => name !== undefined)
			);
			colors = await readSeatTurnColors([...new Set(seatAgentIds.values())]);
		} catch (err) {
			output.appendLine(
				`[${trigger}] turn colours unread, every tab keeps the colour it has: ${String(err)}`
			);
		}
		// THE INDEX IS PASSED BECAUSE A SILENT TERMINAL HAS NO OTHER HANDLE. `readings`
		// is aligned with `terminals`, one each and in order, so a reading's position
		// here is that terminal's position in the window.
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
