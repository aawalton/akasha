import * as vscode from 'vscode';
import { unreachableMessage } from '../../harness-call.ts';
import { recordObservation } from '../../seat/observation-store.ts';
import { SEAT_SIDECAR_GLOB, seatDirs } from '../../seat/turn-color.ts';
import { createColumnMemory, tabInstanceIds } from './columns.ts';
import { type AgentNode, dropSeatAnswers, readAgentForest } from "./forest.ts"
import { seatsByName } from "./lookup.ts";
import { seatTabContext, type SeatTabState } from './seat-tabs.ts';
import { createSubagentReader } from './subagents.ts';
import { planPlaceToggle, planReset, planRunToggle, type SeatStep, type SeatToggleState } from "./toggles.ts"
import type { SeatAct } from "./confirm.ts";
import { createAgentDecorationProvider, createAgentTree, REVEAL_TERMINAL_COMMAND } from './tree.ts';
import { invokedSeat } from './invoked-seat.ts';
import {
	forest,
	output,
	seatTerminals,
	setColumns,
	setForest,
	setOutput,
	setSeatTabs,
	setSeatTerminals,
} from './tree-state.ts';
import { showSeat } from './show-seat.ts';


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

const FEATURE = 'agent-tree';

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
	setOutput(vscode.window.createOutputChannel('Ops: Agent Tree'));
	context.subscriptions.push(output);
	setColumns(createColumnMemory(context.globalState));

	const tree = createAgentTree();
	const view = vscode.window.createTreeView<AgentNode>(VIEW_ID, {
		treeDataProvider: tree.provider,
		showCollapseAll: true,
		showExpandAll: true,
		showFilter: true
	});
	view.message = 'Reading the fleet…';
	const subagents = createSubagentReader();
	context.subscriptions.push(
		tree,
		view,
		vscode.window.registerFileDecorationProvider(createAgentDecorationProvider()),
		view.onDidChangeFilterValue((pattern) => {
			tree.filter(pattern);
			describe();
		}),
		vscode.commands.registerCommand(REVEAL_TERMINAL_COMMAND, (clicked: unknown) =>
			showSeat(clicked)
		)
	);

	let running = 0;

	const describe = (): undefined => {
		const matched = tree.matchCount();
		view.description = matched === undefined
			? (running === 1 ? '1 running' : `${running} running`)
			: `${matched} of ${running} running`;
		return undefined;
	};

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
		output.appendLine(`[${trigger}] ${tabs.length} of ${ids.size} terminal tab(s) hold a seat`);
		return undefined;
	};

	const refresh = async (trigger: string): Promise<undefined> => {
		const sampled = await sampleColumns(trigger, FEATURE);
		if (sampled !== undefined) { setSeatTerminals(sampled); }
		try {
			const { roots, alanPrincipalCount, runningCount } = await readAgentForest(subagents);
			setForest(roots);
			tree.replace(roots);
			running = runningCount;
			describe();
			view.badge = {
				value: runningCount,
				tooltip: runningCount === 1 ? '1 agent running' : `${runningCount} agents running`,
			};
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
			view.message = unreachableMessage(err);
			output.appendLine(`[${trigger}] read failed: ${String(err)}`);
			recordObservation(FEATURE, { outcome: 'failed', failure: String(err) });
		}
		await publishSeatTabs(trigger);
		return undefined;
	};

	const timer = setInterval(() => void refresh('poll'), POLL_INTERVAL_MS);

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

	context.subscriptions.push(
		vscode.window.tabGroups.onDidChangeTabs(() => void publishSeatTabs('tabs'))
	);

	const runPlan = (
		node: unknown,
		plan: (state: SeatToggleState) => readonly SeatStep[],
		act: SeatAct
	): Promise<undefined> => runPlanWith(node, plan, act, refresh);
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
