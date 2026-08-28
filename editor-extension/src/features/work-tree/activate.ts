import * as vscode from 'vscode';
import { repositoryPath, unreachableMessage } from '../../harness-call.ts';
import { recordObservation } from '../../seat/observation-store.ts';
import { SEAT_SIDECAR_GLOB, seatDirs } from '../../seat/turn-color.ts';
import { dropDerivers } from '../../../../tools/lib/deriver-hold.ts';
import { createSettledRefresh } from '../settled-refresh.ts';
import { type WorkNode, type WorkTree, countRows, workKeys, readWorkColours, readWorkTree } from "./harness.ts"
import { recolour } from "./colours.ts";
import { REFRESH_COMMAND, VIEW_ID } from './ids.ts';
import { createWorkDecorationProvider, createWorkTree } from './tree.ts';

const FEATURE = 'work-tree';

const SETTLE_MS = 2_000;

const CORPUS_GLOB = 'pages/initiative/**/*.md';

const SEAT_SETTLE_MS = 25;

let output: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
	output = vscode.window.createOutputChannel('Ops: Work Tree');
	context.subscriptions.push(output);

	const tree = createWorkTree();
	const view = vscode.window.createTreeView<WorkNode>(VIEW_ID, {
		treeDataProvider: tree.provider,
		showCollapseAll: true,
		showExpandAll: true,
		showFilter: true,
	});
	view.message = 'Reading the initiatives…';
	context.subscriptions.push(tree, view);

	let total = 0;

	let standing: WorkTree | undefined;

	const describe = (): undefined => {
		const matched = tree.matchCount();
		view.description = matched === undefined
			? (total === 1 ? '1 row' : `${total} rows`)
			: `${matched} of ${total}`;
		return undefined;
	};

	const refresh = async (trigger: string): Promise<undefined> => {
		try {
			const next = await readWorkTree();
			tree.replace(next);
			standing = next;
			watchCorpus(next.repo);
			const rows = countRows(next.roots);
			total = rows;
			describe();
			view.badge = {
				value: rows,
				tooltip: rows === 1 ? '1 row' : `${rows} rows`,
			};
			view.message = undefined;
			const keys = workKeys(next.roots);
			const duplicated = keys.filter((key, at) => keys.indexOf(key) !== at);
			output.appendLine(`[${trigger}] ${rows} initiative(s) from ${next.repo}`);
			recordObservation(FEATURE, {
				outcome: 'ok',
				counts: {
					initiatives: rows,
					drawnMoreThanOnce: new Set(duplicated).size,
				},
			});
			if (duplicated.length > 0) {
				output.appendLine(`[${trigger}] drawn more than once: ${[...new Set(duplicated)].join(', ')}`);
				void vscode.window.showWarningMessage(
					`Work: ${new Set(duplicated).size} row(s) are drawn more than once. See the Ops: Work Tree output.`
				);
			}
		} catch (err) {
			view.message = unreachableMessage(err);
			output.appendLine(`[${trigger}] read failed: ${String(err)}`);
			recordObservation(FEATURE, { outcome: 'failed', failure: String(err) });
		}
		return undefined;
	};

	const settled = createSettledRefresh(SETTLE_MS, refresh);

	const repaint = async (trigger: string): Promise<undefined> => {
		if (standing === undefined) { return undefined; }
		try {
			const next = recolour(standing, await readWorkColours());
			if (next === undefined) { return undefined; }
			standing = next;
			tree.replace(next);
			output.appendLine(`[${trigger}] recoloured`);
		} catch (err) {
			output.appendLine(`[${trigger}] the colours could not be read: ${String(err)}`);
		}
		return undefined;
	};

	const settledSeats = createSettledRefresh(SEAT_SETTLE_MS, repaint);

	context.subscriptions.push(
		settledSeats,
		...seatDirs().map((dir) => {
			const seats = vscode.workspace.createFileSystemWatcher(
				new vscode.RelativePattern(vscode.Uri.file(dir), SEAT_SIDECAR_GLOB)
			);
			seats.onDidChange(() => settledSeats.request('seat written'));
			seats.onDidCreate(() => settledSeats.request('seat added'));
			seats.onDidDelete(() => settledSeats.request('seat removed'));
			return seats;
		})
	);

	let watched: string | undefined;
	const watchCorpus = (named: string): undefined => {
		if (watched !== undefined) { return undefined; }
		const repo = repositoryPath(named);
		watched = repo;
		const moved = (why: string) => (): void => {
			dropDerivers();
			settled.request(why);
		};
		const watcher = vscode.workspace.createFileSystemWatcher(
			new vscode.RelativePattern(vscode.Uri.file(repo), CORPUS_GLOB)
		);
		context.subscriptions.push(
			watcher,
			watcher.onDidChange(moved('written')),
			watcher.onDidCreate(moved('added')),
			watcher.onDidDelete(moved('removed'))
		);
		output.appendLine(`watching ${repo}/${CORPUS_GLOB}, re-reading ${SETTLE_MS}ms after it settles`);
		return undefined;
	};

	context.subscriptions.push(
		settled,
		view.onDidChangeFilterValue((pattern) => {
			tree.filter(pattern);
			describe();
		}),
		vscode.window.registerFileDecorationProvider(createWorkDecorationProvider()),
		vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh('manual'))
	);

	await refresh('activate');
	return undefined;
}
