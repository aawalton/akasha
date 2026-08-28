/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { unreachableMessage } from '../../harness-call.ts';
import { recordObservation, recordSweep } from '../../seat/observation-store.ts';
import { SEAT_SIDECAR_GLOB, seatDirs } from '../../seat/turn-color.ts';
import { PROCESS_ID_TIMEOUT_MS } from '../../seat/terminal-pids.ts';
import {
	type ColumnMemory,
	createColumnMemory,
	readSeatLookup,
	readSeatTerminals,
	type SeatTerminal,
	tabInstanceIds,
} from './columns.ts';
import { type AgentNode, dropSeatAnswers, readAgentForest } from "./forest.ts"
import { seatsByName } from "./lookup.ts";
import { seatTabContext, type SeatTabState } from './seat-tabs.ts';
import { createSubagentReader } from './subagents.ts';
import { planPlaceToggle, planReset, planRunToggle, type SeatStep, type SeatToggleState } from "./toggles.ts"
import { confirmTurnLoss, type SeatAct } from "./confirm.ts";
import { createAgentDecorationProvider, createAgentTree, REVEAL_TERMINAL_COMMAND } from './tree.ts';
import { asToggleTarget, invokedSeat } from './invoked-seat.ts';
import {
	columns,
	forest,
	output,
	seatTabs,
	seatTerminals,
	setColumns,
	setForest,
	setOutput,
	setSeatTabs,
	setSeatTerminals,
} from './tree-state.ts';
import { showSeat } from './show-seat.ts';
import { performPlan } from './seat-acts.ts';


import { runPlan as runPlanWith } from './run-plan.ts';
import { countRows, sampleColumns } from './sampling.ts';
import {
	COPY_SEAT_NAME_COMMAND,
	PLACE_HEADLESS_COMMAND,
	PLACE_INTERACTIVE_COMMAND,
	POLL_INTERVAL_MS,
	REFRESH_COMMAND,
	RUN_RESET_COMMAND,
	RUN_RESUME_COMMAND,
	RUN_STOP_COMMAND,
	SEAT_SETTLE_MS,
	VIEW_ID,
} from './ids.ts';

/**
 * This feature's name in the observation record, and in `extension.ts`'s list.
 *
 * Declared here rather than beside the other names, because a verifier reads it out of this
 * file: a feature that records observations says which key it records them under in its own
 * `activate.ts`, and the test beside the record holds every feature to that.
 */
const FEATURE = 'agent-tree';

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
	setOutput(vscode.window.createOutputChannel('Ops: Agent Tree'));
	context.subscriptions.push(output);
	setColumns(createColumnMemory(context.globalState));

	const tree = createAgentTree();
	// A TreeView rather than a bare provider registration, because the header count
	// hangs off the handle: `description` sits beside the title in the view header
	// and `badge` on the container's icon. Creating one moves no focus — only
	// `reveal` does that, and nothing here calls it.
	const view = vscode.window.createTreeView<AgentNode>(VIEW_ID, {
		treeDataProvider: tree.provider,
		showCollapseAll: true,
		showExpandAll: true,
		// The filter bar the Domains panel states the reason for. It earns its row here for a
		// different reason: this tree re-reads every ten seconds, so a fleet the reader is watching
		// moves under them, and a filter is how they keep hold of the seats they care about.
		showFilter: true
	});
	// SET BEFORE ANYTHING IS AWAITED, so the panel is never silently blank. There
	// are three ways this view can hold no rows — it has not read yet, the read
	// failed, or the fleet is empty — and on 2026-08-13 Alan met a fourth, VS
	// Code's own "There is no data provider registered", which he could not tell
	// from the panel being broken again. The first read overwrites this with
	// either a failure reason or `undefined`; the point is that the gap between
	// registering and reading now says which state this is.
	view.message = 'Reading the fleet…';
	const subagents = createSubagentReader();
	context.subscriptions.push(
		tree,
		view,
		vscode.window.registerFileDecorationProvider(createAgentDecorationProvider()),
		// The filter bar's answer is this extension's to give, for the reason the Domains panel
		// states at length and `tree-filter.ts` holds the measurement for.
		view.onDidChangeFilterValue((pattern) => {
			tree.filter(pattern);
			describe();
		}),
		vscode.commands.registerCommand(REVEAL_TERMINAL_COMMAND, (clicked: unknown) =>
			showSeat(clicked)
		)
	);

	// THE ROWS ARE READ FROM THE PAGES IN THIS PROCESS. Every field on a seat row is a property
	// some page declares, so one query per page type answers the whole fleet. Nothing is spawned
	// here and nothing is read from a database.
	/** Seats running in the fleet, as against what a filter has left standing. */
	let running = 0;

	/** What stands beside the view's title. The Domains panel states why it says both numbers. */
	const describe = (): undefined => {
		const matched = tree.matchCount();
		view.description = matched === undefined
			? (running === 1 ? '1 running' : `${running} running`)
			: `${matched} of ${running} running`;
		return undefined;
	};

	/**
	 * Publishes which tabs a right-click serves the seat's own menu on.
	 *
	 * THE TAB MODEL IS RE-READ HERE, never carried from the sweep, which is what keeps a
	 * closed tab's id out of the answer: an id is published because a tab holds that
	 * terminal at this moment. It costs a walk of the open tabs and nothing else — no `ps`
	 * snapshot and no query.
	 *
	 * A SEAT WITH NO TAB IS NOT PUBLISHED, and neither is a tab whose terminal runs no
	 * seat. Both fall out of the two lookups rather than being checked for.
	 *
	 * THE STATE COMES FROM THE FOREST, so a tab is offered exactly what the panel's row is
	 * offered for that seat. Where the last read failed the last good forest is what is
	 * read, which is the same thing the panel is still showing.
	 */
	const publishSeatTabs = async (trigger: string): Promise<undefined> => {
		const ids = tabInstanceIds();
		const seats = seatsByName(forest);
		const tabs: SeatTabState[] = [];
		const behind = new Map<number, AgentNode>();
		for (const { name, terminal } of seatTerminals) {
			const instanceId = ids.get(terminal);
			if (instanceId === undefined) { continue; }
			const seat = seats.get(name);
			if (seat === undefined) { continue; }
			tabs.push({ instanceId, live: seat.live, place: seat.place });
			behind.set(instanceId, seat);
		}
		setSeatTabs(behind);
		const values = seatTabContext(tabs);
		for (const [key, published] of Object.entries(values)) {
			await vscode.commands.executeCommand('setContext', key, published);
		}
		// THE ONLY RECORD THAT A TAB IS CLAIMED. A claim shows as a different menu on a
		// right-click and nowhere else, so a window in which the join answered nothing looks
		// exactly like one nobody has right-clicked.
		output.appendLine(`[${trigger}] ${tabs.length} of ${ids.size} terminal tab(s) hold a seat`);
		return undefined;
	};

	const refresh = async (trigger: string): Promise<undefined> => {
		// Sampled before the read rather than after it, so a failed query still
		// leaves the columns current. The two are independent: this reads the
		// window, the query reads the fleet.
		const sampled = await sampleColumns(trigger, FEATURE);
		if (sampled !== undefined) { setSeatTerminals(sampled); }
		try {
			const { roots, alanPrincipalCount, runningCount } = await readAgentForest(subagents);
			setForest(roots);
			tree.replace(roots);
			// WHAT ALAN READS WITHOUT OPENING ANYTHING. `description` shows beside the
			// title, so it survives the tree being collapsed; `badge` shows on the
			// container icon, so it survives the panel merely being in view. Both are
			// set from the one number, which is counted off the tree itself.
			running = runningCount;
			describe();
			view.badge = {
				value: runningCount,
				tooltip: runningCount === 1 ? '1 agent running' : `${runningCount} agents running`,
			};
			// Cleared on the read that succeeds, so a reason never outlives the failure
			// that put it there.
			view.message = undefined;
			output.appendLine(
				`[${trigger}] ${runningCount} running, ${countRows(roots)} rows, ` +
				`${roots.length} roots, ${alanPrincipalCount} answering to Alan`
			);
			recordObservation(FEATURE, {
				outcome: 'ok',
				counts: {
					running: runningCount,
					rows: countRows(roots),
					roots: roots.length,
					answeringToAlan: alanPrincipalCount,
				},
			});
		} catch (err) {
			// A failed poll leaves the last good forest AND the last good count on
			// screen. Blanking either would turn a transient read failure into "the
			// fleet is empty", which is a claim this cannot make.
			//
			// BUT ON THE FIRST READ THERE IS NO LAST GOOD FOREST, and what stays on
			// screen is an empty panel, which is exactly what a fleet holding no seats
			// looks like. `message` draws above the rows whether or not there are any,
			// so the two readings stop being the same picture. Alan read the empty one
			// on 2026-08-13 and had no way to tell.
			view.message = unreachableMessage(err);
			output.appendLine(`[${trigger}] read failed: ${String(err)}`);
			recordObservation(FEATURE, { outcome: 'failed', failure: String(err) });
		}
		// OUTSIDE THE TRY, so a failed read still republishes. The keys would otherwise hold
		// whatever the last successful poll left, and a seat that stopped in between would
		// keep offering Stop from its tab.
		await publishSeatTabs(trigger);
		return undefined;
	};

	const timer = setInterval(() => void refresh('poll'), POLL_INTERVAL_MS);

	/**
	 * THE SAME MOMENT THE TAB STRIP REDRAWS ON. A seat's turn state is stamped into the
	 * sidecar beside its page, and the tab strip follows those files directly — so with only
	 * the poll here, this panel could sit up to a whole interval behind the strip and draw the
	 * same seat in another colour. Both surfaces resolve colour through the harness's one
	 * reader, so a disagreement on screen is never a disagreement about the seat: it is only
	 * one of them having asked later than the other. Following the same files is what removes
	 * the gap, rather than shortening the interval and narrowing it.
	 *
	 * COALESCED, BECAUSE A STAMP IS NOT A REDRAW. One act can stamp several seats and each
	 * write lands as its own event, so a burst arrives where Alan sees one change. The settle
	 * below turns a burst into a single read. The read is also what drops the held reading of the
	 * pages, so a stamp is what makes the next answer fresh rather than the interval below it.
	 *
	 * THE POLL STAYS. It is what covers a change no file event reports — a terminal closing,
	 * a process exiting — and what recovers the panel if a watcher is lost.
	 */
	let settling: ReturnType<typeof setTimeout> | undefined;
	const followSeats = (): void => {
		if (settling !== undefined) { clearTimeout(settling); }
		settling = setTimeout(() => {
			settling = undefined;
			dropSeatAnswers();
			void refresh('seat');
		}, SEAT_SETTLE_MS);
	};
	context.subscriptions.push(
		...seatDirs().map((dir) => {
			const seats = vscode.workspace.createFileSystemWatcher(
				new vscode.RelativePattern(vscode.Uri.file(dir), SEAT_SIDECAR_GLOB)
			);
			seats.onDidChange(followSeats);
			seats.onDidCreate(followSeats);
			seats.onDidDelete(followSeats);
			return seats;
		}),
		{ dispose: () => { if (settling !== undefined) { clearTimeout(settling); } } }
	);

	// A TAB OPENING OR CLOSING CHANGES WHICH IDS ARE LIVE, and it changes them at Alan's
	// speed rather than the poll's — a terminal opened and right-clicked inside ten seconds
	// would otherwise get the built-in menu. Nothing is re-queried here: this walks the tab
	// model against the seats already in hand.
	context.subscriptions.push(
		vscode.window.tabGroups.onDidChangeTabs(() => void publishSeatTabs('tabs'))
	);

	const runPlan = (
		node: unknown,
		plan: (state: SeatToggleState) => readonly SeatStep[],
		act: SeatAct
	): Promise<undefined> => runPlanWith(node, plan, act, refresh);
	/**
	 * Puts the clicked seat's name on the clipboard.
	 *
	 * `asToggleTarget` is reused here for its REFUSAL rather than for a toggle: it
	 * demands `kind: 'seat'`, which is exactly the check this needs, because a
	 * subagent row has no seat name to copy and is offered no such entry.
	 */
	const copySeatName = async (node: unknown): Promise<undefined> => {
		const seat = invokedSeat(node);
		if (seat === undefined) { return undefined; }
		await vscode.env.clipboard.writeText(seat.name);
		output.appendLine(`[copy-seat-name] ${seat.name}: copied`);
		return undefined;
	};

	context.subscriptions.push(
		{ dispose: () => clearInterval(timer) },
		vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh('manual')),
		vscode.commands.registerCommand(PLACE_INTERACTIVE_COMMAND, (n: unknown) =>
			runPlan(n, planPlaceToggle, 'place-interactive')
		),
		vscode.commands.registerCommand(PLACE_HEADLESS_COMMAND, (n: unknown) =>
			runPlan(n, planPlaceToggle, 'place-headless')
		),
		vscode.commands.registerCommand(RUN_STOP_COMMAND, (n: unknown) =>
			runPlan(n, planRunToggle, 'run-stop')
		),
		vscode.commands.registerCommand(RUN_RESUME_COMMAND, (n: unknown) =>
			runPlan(n, planRunToggle, 'run-resume')
		),
		vscode.commands.registerCommand(RUN_RESET_COMMAND, (n: unknown) =>
			runPlan(n, planReset, 'run-reset')
		),
		vscode.commands.registerCommand(COPY_SEAT_NAME_COMMAND, (n: unknown) => copySeatName(n))
	);

	await refresh('activate');
	return undefined;
}
