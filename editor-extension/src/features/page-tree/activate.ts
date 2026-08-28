import * as vscode from 'vscode';
import { repositoryPath, unreachableMessage } from '../../harness-call.ts';
import { recordObservation } from '../../seat/observation-store.ts';
import { dropDerivers } from '../../../../tools/lib/deriver-hold.ts';
import { createSettledRefresh } from '../settled-refresh.ts';
import { countPages, countRows, readPageTree } from "./harness.ts"
import { type PageNode } from "./assemble.ts";
import { REFRESH_COMMAND, VIEW_ID } from './ids.ts';
import { createPageTree } from './tree.ts';

const FEATURE = 'page-tree';

const SETTLE_MS = 2_000;

const CORPUS_GLOB = '**/*.md';

let output: vscode.OutputChannel;

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
	output = vscode.window.createOutputChannel('Ops: Page Tree');
	context.subscriptions.push(output);

	const tree = createPageTree();
	const view = vscode.window.createTreeView<PageNode>(VIEW_ID, {
		treeDataProvider: tree.provider,
		showCollapseAll: true,
		showExpandAll: true,
		showFilter: true,
	});
	view.message = 'Reading the pages…';
	context.subscriptions.push(tree, view);

	let total = 0;

	const describe = (): undefined => {
		const matched = tree.matchCount();
		view.description = matched === undefined
			? (total === 1 ? '1 row' : `${total} rows`)
			: `${matched} of ${total}`;
		return undefined;
	};

	const refresh = async (trigger: string): Promise<undefined> => {
		try {
			const next = await readPageTree();
			tree.replace(next);
			watchCorpus(next.repo);
			const rows = countRows(next.roots);
			const pages = countPages(next.roots);
			total = rows;
			describe();
			view.badge = {
				value: rows,
				tooltip: rows === 1 ? '1 row' : `${rows} rows`,
			};
			view.message = undefined;
			output.appendLine(
				`[${trigger}] ${rows} row(s), ${pages} of them opening a document, ` +
				`under ${next.roots.length} root(s) from ${next.repo}` +
				(next.unreached.length === 0
					? ''
					: `; ${next.unreached.length} reached by no root: ${next.unreached.join(', ')}`)
			);
			recordObservation(FEATURE, {
				outcome: 'ok',
				counts: {
					rows,
					pages,
					roots: next.roots.length,
					reachedByNoRoot: next.unreached.length,
				},
			});
			if (next.unreached.length > 0) {
				void vscode.window.showWarningMessage(
					`Pages: ${next.unreached.length} page type(s) hang under no root and are not shown. See the Ops: Page Tree output.`
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

	const moved = (why: string) => (): void => {
		dropDerivers();
		settled.request(why);
	};

	let watched: string | undefined;
	const watchCorpus = (named: string): undefined => {
		if (watched !== undefined) { return undefined; }
		const repo = repositoryPath(named);
		watched = repo;
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
		vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh('manual'))
	);

	await refresh('activate');
	return undefined;
}
