/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { repositoryPath, unreachableMessage } from '../../harness-call.ts';
import { recordObservation } from '../../seat/observation-store.ts';
import { createSettledRefresh } from '../settled-refresh.ts';
import { countPages, countRows, readPageTree } from "./harness.ts"
import { type PageNode } from "./assemble.ts";
import { REFRESH_COMMAND, VIEW_ID } from './ids.ts';
import { createPageTree } from './tree.ts';

/** This feature's name in the observation record, and in `extension.ts`'s list. */
const FEATURE = 'page-tree';

/**
 * How long the repository must be quiet before it is re-read. The Domains panel beside this one
 * settles for the same span and states why: a commit lands its documents one write at a time, and
 * this is what turns that burst into a single read.
 */
const SETTLE_MS = 2_000;

/**
 * WHAT IS WATCHED, AND WHY IT IS EVERY DOCUMENT RATHER THAN `page-types/`. Both vocabularies this
 * panel draws are declared in front matter rather than in a folder: a page type is any document
 * declaring `page-type-slug: page-type`, and the property types come from what the pages themselves
 * carry. A glob naming folders would be a second answer to where those declarations live, free to
 * drift from the repository's own and the one nobody watches. Every markdown file is a superset
 * that cannot drift, and the extra events it catches cost one read that settling has already
 * coalesced.
 */
const CORPUS_GLOB = '**/*.md';

let output: vscode.OutputChannel;

/**
 * The Pages panel: the page types under `page`, and beside them the property types their front
 * matter can carry.
 *
 * ITS OWN CONTAINER, as the three panels beside it have. `package.json` declares a fourth
 * `viewsContainers.secondarySidebar` entry holding this one view, which is what puts the word Pages
 * in the top strip beside Agents, Domains and Work. A second view under any of those would have
 * nested it inside that panel instead, which is not what was asked for.
 *
 * NO POLL AND NO BARE BUTTON, for the reason the Domains panel states at length. This vocabulary
 * changes when a seat writes to the instructions repository, and re-reading it means spawning a
 * process that scans several hundred documents — on a timer that is a subprocess a minute, for ever,
 * against a view whose content changed hours ago. What it answers to instead is the repository being
 * written, which is the event the timer would have been standing in for. The button stays beside it,
 * because a read that failed is still worth asking for again.
 */
export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
	output = vscode.window.createOutputChannel('Ops: Page Tree');
	context.subscriptions.push(output);

	const tree = createPageTree();
	// A TreeView rather than a bare provider registration, because the affordances hang off the
	// handle. `showExpandAll` is this fork's own addition to the workbench and walks breadth-first,
	// fetching each level before the one below, so it reaches the bottom of a deep branch rather than
	// stopping at what happens to be materialised.
	//
	// `showFilter` is this fork's own addition too. `tree-filter.ts` holds the measurement for why
	// the workbench's own filter cannot answer over a tree fetched a branch at a time.
	const view = vscode.window.createTreeView<PageNode>(VIEW_ID, {
		treeDataProvider: tree.provider,
		showCollapseAll: true,
		showExpandAll: true,
		showFilter: true,
	});
	// SET BEFORE ANYTHING IS AWAITED, so the panel is never silently blank between being registered
	// and being read. On 2026-08-13 Alan met VS Code's own "There is no data provider registered" on
	// the panels beside this one and had no way to tell it from them being broken again. The first
	// read overwrites this either way.
	view.message = 'Reading the pages…';
	context.subscriptions.push(tree, view);

	/** Every row on the tree, of every kind, as against what a filter has left standing. */
	let total = 0;

	/**
	 * What stands beside the view's title.
	 *
	 * IT SAYS BOTH NUMBERS WHILE A FILTER STANDS, for the reason the Domains panel states: a bare
	 * count of what matched leaves the reader unable to tell a narrow filter from a corpus that
	 * failed to load, and those look identical on a tree drawn to three rows.
	 *
	 * AND IT COUNTS ROWS RATHER THAN DOCUMENTS. Most rows here open one, but the two roots and the
	 * grouping rows beneath them do not, and the filter matches on any row's own text — so a total
	 * that left them out could be smaller than the number of matches held against it. `countPages`
	 * answers the other question into the output channel below.
	 */
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
			// ARMED FROM THE READ, so that from here on this view keeps itself current. Declared below
			// rather than above only because the two refer to each other: the read arms the watch, and
			// the watch asks for a read.
			watchCorpus(next.repo);
			const rows = countRows(next.roots);
			const pages = countPages(next.roots);
			total = rows;
			describe();
			// BOTH, FOR THE SAME REASON THE AGENTS PANEL SETS BOTH. `description` shows beside the
			// title, so it survives the tree being collapsed; `badge` shows on the container icon, so
			// it survives the panel merely being in view. Counted off the tree once and used twice, so
			// the two can never disagree.
			//
			// THE BADGE COUNTS THE TREE RATHER THAN THE FILTER. It sits on the container icon, which is
			// on screen when this panel is not, and a badge that moved as somebody typed in another
			// panel would report the vocabulary shrinking.
			view.badge = {
				value: rows,
				tooltip: rows === 1 ? '1 row' : `${rows} rows`,
			};
			// Cleared on the read that succeeds, so a reason never outlives the failure that put it
			// there.
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
					// The warning below reaches Alan and nothing else. A tree quietly missing part of
					// the vocabulary looks exactly like a complete one from a shell too.
					reachedByNoRoot: next.unreached.length,
				},
			});
			// SAID OUT LOUD RATHER THAN LEFT TO THE EYE. A page type no root reaches is absent from the
			// tree, and a tree quietly missing part of the vocabulary looks exactly like a complete
			// one. This is the `extends-slug:` edge having a cycle or a gap in it, which is a fault in
			// the repository rather than in the panel.
			if (next.unreached.length > 0) {
				void vscode.window.showWarningMessage(
					`Pages: ${next.unreached.length} page type(s) hang under no root and are not shown. See the Ops: Page Tree output.`
				);
			}
		} catch (err) {
			// A failed read leaves the last good tree on screen. Blanking it would turn a transient
			// failure into "there are no pages", which is a claim this cannot make.
			//
			// BUT ON THE FIRST READ THERE IS NO LAST GOOD TREE, and an empty panel is exactly what a
			// repository holding no page types would look like. `message` draws above the rows whether
			// or not there are any, so the two stop being the same picture. Alan read the empty one on
			// the panels beside this one on 2026-08-13 and had no way to tell without opening this
			// channel.
			view.message = unreachableMessage(err);
			output.appendLine(`[${trigger}] read failed: ${String(err)}`);
			recordObservation(FEATURE, { outcome: 'failed', failure: String(err) });
		}
		return undefined;
	};

	const settled = createSettledRefresh(SETTLE_MS, refresh);

	/**
	 * Watches the instructions repository, so a document written anywhere in it re-reads this view.
	 *
	 * THE REPOSITORY IS TAKEN FROM THE COMMAND'S ANSWER rather than from a path held here, for the
	 * reason `harness.ts` states: where the instructions repository sits is the harness's fact, and a
	 * second copy of it in this extension would be a second thing to be wrong. It follows that there
	 * is no watch until a read has succeeded, which costs nothing — until then there is no tree on
	 * screen for a watch to keep current, and the message above the empty rows already says why.
	 *
	 * ARMED ONCE AND NEVER SWAPPED. The repository does not move under a running window, and a second
	 * watcher over the same files would ask for two reads per write.
	 */
	let watched: string | undefined;
	const watchCorpus = (named: string): undefined => {
		if (watched !== undefined) { return undefined; }
		// SPELLED THE WAY THE WORKSPACE SPELLS IT, which is not always the way the command answers.
		// `harness-call` holds the measurement.
		const repo = repositoryPath(named);
		watched = repo;
		const watcher = vscode.workspace.createFileSystemWatcher(
			new vscode.RelativePattern(vscode.Uri.file(repo), CORPUS_GLOB)
		);
		context.subscriptions.push(
			watcher,
			// ALL THREE, because a page type arrives as a created file and leaves as a deleted one, and
			// a view that answered only to edits would hold a page type that is gone.
			watcher.onDidChange(() => settled.request('written')),
			watcher.onDidCreate(() => settled.request('added')),
			watcher.onDidDelete(() => settled.request('removed'))
		);
		output.appendLine(`watching ${repo}/${CORPUS_GLOB}, re-reading ${SETTLE_MS}ms after it settles`);
		return undefined;
	};

	context.subscriptions.push(
		settled,
		// The filter bar's answer is this extension's to give, for the reason the Domains panel states
		// at length and `tree-filter.ts` holds the measurement for.
		view.onDidChangeFilterValue((pattern) => {
			tree.filter(pattern);
			describe();
		}),
		vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh('manual'))
	);

	await refresh('activate');
	return undefined;
}
