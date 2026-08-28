/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { repositoryPath, unreachableMessage } from '../../harness-call.ts';
import { recordObservation } from '../../seat/observation-store.ts';
import { createSettledRefresh } from '../settled-refresh.ts';
import { countDomains, type DomainNode, readDomainTree } from './harness.ts';
import { REFRESH_COMMAND, VIEW_ID } from './ids.ts';
import { createDomainTree } from './tree.ts';

/** This feature's name in the observation record, and in `extension.ts`'s list. */
const FEATURE = 'domain-tree';

/**
 * How long the repository must be quiet before it is re-read.
 *
 * A commit lands its documents one write at a time, so this is what turns a burst of writes into a
 * single read. Long enough to cover the gap between two files of one commit; short enough that a
 * document Alan just saved is on the tree before he looks back at it.
 */
const SETTLE_MS = 2_000;

/**
 * WHAT IS WATCHED, AND WHY IT IS EVERY DOCUMENT RATHER THAN THE FOLDERS DOMAINS SIT IN. A domain is
 * any document declaring `domain-slug:`, whatever folder it stands in — `domains/`, `page-types/`
 * and others — so a glob naming folders would be a second answer to where domains live, free to
 * drift from the repository's own and the one nobody watches. Every markdown file is a superset
 * that cannot drift, and the extra events it catches cost one read that settling has already
 * coalesced.
 */
const CORPUS_GLOB = '**/*.md';

let output: vscode.OutputChannel;

/**
 * The Domains panel: the domain championing tree, beside Agents rather than inside it.
 *
 * ITS OWN CONTAINER. `package.json` declares a second `viewsContainers.secondarySidebar`
 * entry holding this one view, which is what puts the word Domains in the top strip next
 * to Agents. A second view under `opsAgents` would have nested it inside that panel
 * instead, which is not what was asked for.
 *
 * STILL NO POLL, AND NOW NOT A BUTTON EITHER. The Agents view re-reads every ten seconds
 * because the fleet turns over on that scale — seats spawn, work and stop while nobody
 * touches anything. The domain corpus does not: it changes when a seat writes to the
 * instructions repository, and re-reading it means spawning a process that scans several
 * hundred documents. On a timer that is a subprocess a minute, for ever, against a view
 * whose content changed hours ago. So this view was given a refresh button instead — and
 * that left a corpus that HAD changed looking exactly like one that had not, which is a
 * reading Alan had no way to take without pressing something. What it watches now is the
 * repository itself: nothing is spent while nothing is written, and a write is the event
 * the timer was standing in for. `settled-refresh` holds why that is not wired straight
 * through. The button stays, because a read that failed is still worth asking for again.
 */
export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
	output = vscode.window.createOutputChannel('Ops: Domain Tree');
	context.subscriptions.push(output);

	const tree = createDomainTree();
	// A TreeView rather than a bare provider registration, because the affordances hang off the
	// handle. `showExpandAll` is this fork's own addition to the workbench and walks breadth-first,
	// fetching each level before the one below, so it reaches the bottom of a nine-deep tree rather
	// than stopping at what happens to be materialised.
	//
	// `showFilter` is this fork's own addition too, and this tree is the reason for it: several
	// hundred domains nested nine deep is not a thing anybody scrolls. Every tree in the workbench
	// can already filter on `list.find`, but a panel whose whole shape is "find the one you want"
	// should not make that a thing you have to know.
	const view = vscode.window.createTreeView<DomainNode>(VIEW_ID, {
		treeDataProvider: tree.provider,
		showCollapseAll: true,
		showExpandAll: true,
		showFilter: true,
	});
	// SET BEFORE ANYTHING IS AWAITED, so the panel is never silently blank between
	// being registered and being read. On 2026-08-13 Alan met VS Code's own "There
	// is no data provider registered" here and had no way to tell it from the
	// panel being broken again. The first read overwrites this either way.
	view.message = 'Reading the domains…';
	context.subscriptions.push(tree, view);

	/** The whole corpus, as against what a filter has left standing. */
	let total = 0;

	/**
	 * What stands beside the view's title.
	 *
	 * IT SAYS BOTH NUMBERS WHILE A FILTER STANDS. A bare count of what matched leaves the reader
	 * unable to tell a narrow filter from a corpus that failed to load, and those look identical
	 * on a tree drawn to three rows.
	 */
	const describe = (): undefined => {
		const matched = tree.matchCount();
		view.description = matched === undefined
			? (total === 1 ? '1 domain' : `${total} domains`)
			: `${matched} of ${total}`;
		return undefined;
	};

	const refresh = async (trigger: string): Promise<undefined> => {
		try {
			const next = await readDomainTree();
			tree.replace(next);
			// ARMED FROM THE READ, so that from here on this view keeps itself current. Declared
			// below rather than above only because the two refer to each other: the read arms the
			// watch, and the watch asks for a read.
			watchCorpus(next.repo);
			total = countDomains(next.roots);
			describe();
			// BOTH, FOR THE SAME REASON THE AGENTS PANEL SETS BOTH. `description` shows
			// beside the title, so it survives the tree being collapsed; `badge` shows on
			// the container icon, so it survives the panel merely being in view. Set from
			// the one number rather than counted twice.
			//
			// THE BADGE COUNTS THE CORPUS RATHER THAN THE FILTER. It sits on the container icon,
			// which is on screen when this panel is not, and a badge that moved as somebody typed
			// in another panel would report the corpus shrinking.
			view.badge = {
				value: total,
				tooltip: total === 1 ? '1 domain' : `${total} domains`,
			};
			const count = total;
			// Cleared on the read that succeeds, so a reason never outlives the failure that
			// put it there.
			view.message = undefined;
			output.appendLine(
				`[${trigger}] ${count} domain(s) under ${next.roots.length} root(s) from ${next.repo}` +
				(next.unreached.length === 0
					? ''
					: `; ${next.unreached.length} reached by no root: ${next.unreached.join(', ')}`)
			);
			recordObservation(FEATURE, {
				outcome: 'ok',
				counts: {
					domains: count,
					roots: next.roots.length,
					// The warning below reaches Alan and nothing else. A tree quietly missing
					// part of the corpus looks exactly like a complete one from a shell too.
					reachedByNoRoot: next.unreached.length,
				},
			});
			// SAID OUT LOUD RATHER THAN LEFT TO THE EYE. A domain no root reaches is absent
			// from the tree, and a tree quietly missing part of the corpus looks exactly like
			// a complete one. This is the championing edge having a cycle or a gap in it, which
			// is a fault in the repository rather than in the panel.
			if (next.unreached.length > 0) {
				void vscode.window.showWarningMessage(
					`Domains: ${next.unreached.length} domain(s) hang under no root and are not shown. See the Ops: Domain Tree output.`
				);
			}
		} catch (err) {
			// A failed read leaves the last good tree on screen. Blanking it would turn a
			// transient failure into "there are no domains", which is a claim this cannot make.
			//
			// BUT ON THE FIRST READ THERE IS NO LAST GOOD TREE, and an empty panel is exactly
			// what a corpus holding no domains would look like. `message` draws above the rows
			// whether or not there are any, so the two stop being the same picture. Alan read
			// the empty one on 2026-08-13 and had no way to tell without opening this channel.
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
	 * THE REPOSITORY IS TAKEN FROM THE VERB'S ANSWER rather than from a path held here, for the
	 * reason `harness.ts` states: where the instructions repository sits is the harness's fact, and
	 * a second copy of it in this extension would be a second thing to be wrong. It follows that
	 * there is no watch until a read has succeeded, which costs nothing — until then there is no
	 * tree on screen for a watch to keep current, and the message above the empty rows already says
	 * why.
	 *
	 * ARMED ONCE AND NEVER SWAPPED. The repository does not move under a running window, and a
	 * second watcher over the same files would ask for two reads per write.
	 */
	let watched: string | undefined;
	const watchCorpus = (named: string): undefined => {
		if (watched !== undefined) { return undefined; }
		// SPELLED THE WAY THE WORKSPACE SPELLS IT, which is not always the way the verb answers.
		// `harness-call` holds the measurement.
		const repo = repositoryPath(named);
		watched = repo;
		const watcher = vscode.workspace.createFileSystemWatcher(
			new vscode.RelativePattern(vscode.Uri.file(repo), CORPUS_GLOB)
		);
		context.subscriptions.push(
			watcher,
			// ALL THREE, because a domain arrives as a created file and leaves as a deleted one,
			// and a view that answered only to edits would hold a domain that is gone.
			watcher.onDidChange(() => settled.request('written')),
			watcher.onDidCreate(() => settled.request('added')),
			watcher.onDidDelete(() => settled.request('removed'))
		);
		output.appendLine(`watching ${repo}/${CORPUS_GLOB}, re-reading ${SETTLE_MS}ms after it settles`);
		return undefined;
	};

	context.subscriptions.push(
		settled,
		// THE FILTER BAR'S ANSWER IS THIS EXTENSION'S TO GIVE. The view holds the bar and reports
		// what is typed into it; the tree it draws is fetched a branch at a time, so the workbench
		// could only ever match the branches already open. This panel holds the whole corpus from
		// one read, so it answers over all of it. `tree-filter.ts` states the measurement.
		view.onDidChangeFilterValue((pattern) => {
			tree.filter(pattern);
			describe();
		}),
		vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh('manual'))
	);

	await refresh('activate');
	return undefined;
}
