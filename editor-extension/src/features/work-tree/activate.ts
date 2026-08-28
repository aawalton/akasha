/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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

/** This feature's name in the observation record, and in `extension.ts`'s list. */
const FEATURE = 'work-tree';

/**
 * How long the repository must be quiet before it is re-read. The Domains panel beside this one
 * settles for the same span and states why: a commit lands its documents one write at a time, and
 * this is what turns that burst into a single read.
 */
const SETTLE_MS = 2_000;

/**
 * WHAT IS WATCHED, AND WHY IT IS NARROWER THAN THE DOMAINS PANEL'S. This tree is drawn from
 * initiatives and nothing else — those are the only documents that can move a row here. The akasha
 * repository also carries findings, tens of thousands of them, written far more often and changing
 * nothing on this tree; watching every document would drop the held answers on each of them.
 *
 * A WATCH THAT MATCHES NOTHING DOES NOT FAIL, IT GOES QUIET, so this names the one folder an
 * initiative's page type puts its documents in rather than guessing at a second.
 */
const CORPUS_GLOB = 'pages/initiative/**/*.md';

/**
 * How long the seat files must be quiet before the colours are asked for again.
 *
 * SHORT ENOUGH TO SIT INSIDE THE BUDGET, WHICH IS WHAT SETS IT. A turn state changing is drawn
 * within 100ms, and this wait is spent before the read rather than during it. With the read at 30ms
 * this leaves better than half the budget unspent.
 *
 * STILL COALESCED RATHER THAN IMMEDIATE. One seat's turn moving writes its sidecar a few times in
 * quick succession, and those writes land within a millisecond or two of each other — which is what
 * this span is sized against, rather than against the whole burst a commit makes. The 2000ms above
 * is that other case, and stays where it is.
 */
const SEAT_SETTLE_MS = 25;

let output: vscode.OutputChannel;

/**
 * The Work panel: the initiatives standing under no other, alphabetical by slug, and the initiatives
 * standing under each.
 *
 * ITS OWN CONTAINER, as the Domains panel has. `package.json` declares a third
 * `viewsContainers.secondarySidebar` entry holding this one view, which is what puts the word
 * Work in the top strip beside Agents and Domains. A second view under either of those would
 * have nested it inside that panel instead, which is not what was asked for.
 *
 * STILL NO POLL, AND NOW NOT A BUTTON EITHER, for the reason the Domains panel states at length.
 * The corpus changes when a seat writes to it, so what this answers to is the repository being
 * written, which is the event a timer would only have been standing in for. The button stays
 * beside it, because a read that failed is still worth asking for again.
 */
export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
	output = vscode.window.createOutputChannel('Ops: Work Tree');
	context.subscriptions.push(output);

	const tree = createWorkTree();
	// A TreeView rather than a bare provider registration, because the affordances hang off the
	// handle. `showExpandAll` is this fork's own addition and walks breadth-first, fetching each
	// level before the one below — though on this tree it opens several hundred rows, which is why
	// every branch is built collapsed.
	const view = vscode.window.createTreeView<WorkNode>(VIEW_ID, {
		treeDataProvider: tree.provider,
		showCollapseAll: true,
		showExpandAll: true,
		// The filter bar the Domains panel beside this one states the reason for.
		showFilter: true,
	});
	// SET BEFORE ANYTHING IS AWAITED, so the panel is never silently blank between
	// being registered and being read. On 2026-08-13 Alan met VS Code's own "There
	// is no data provider registered" here and had no way to tell it from the
	// panel being broken again. The first read overwrites this either way.
	view.message = 'Reading the initiatives…';
	context.subscriptions.push(tree, view);

	/** Every row on the tree, of every kind, as against what a filter has left standing. */
	let total = 0;

	/**
	 * The tree as it currently stands on screen, which is what a repaint takes its colours against.
	 *
	 * HELD HERE BECAUSE THE PROVIDER DOES NOT GIVE IT BACK. `tree.replace` is a setter, and a repaint
	 * needs the rows it is recolouring. Undefined until the first read answers, which is what tells a
	 * repaint there is nothing yet to colour.
	 */
	let standing: WorkTree | undefined;

	/** What stands beside the view's title. The Domains panel states why it says both numbers. */
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
			// ARMED FROM THE READ, so that from here on this view keeps itself current. Declared
			// below rather than above only because the two refer to each other: the read arms the
			// watch, and the watch asks for a read.
			watchCorpus(next.repo);
			const rows = countRows(next.roots);
			total = rows;
			describe();
			// BOTH, FOR THE SAME REASON THE AGENTS PANEL SETS BOTH. `description` shows beside
			// the title, so it survives the tree being collapsed; `badge` shows on the container
			// icon, so it survives the panel merely being in view. Counted off the tree once and
			// used twice, so the two can never disagree.
			view.badge = {
				value: rows,
				tooltip: rows === 1 ? '1 row' : `${rows} rows`,
			};
			// Cleared on the read that succeeds, so a reason never outlives the failure that put
			// it there.
			view.message = undefined;
			const keys = workKeys(next.roots);
			const duplicated = keys.filter((key, at) => keys.indexOf(key) !== at);
			output.appendLine(`[${trigger}] ${rows} initiative(s) from ${next.repo}`);
			// SAID OUT LOUD RATHER THAN LEFT TO THE EYE. A row drawn twice is the shape a parent
			// edge goes wrong in, and a tree quietly holding a row twice looks exactly like a sound
			// one. `workTree` is where that would be a defect; this is the panel noticing rather
			// than trusting, because a wrong tree is the one thing this panel exists not to show.
			recordObservation(FEATURE, {
				outcome: 'ok',
				counts: {
					initiatives: rows,
					// The warning below reaches Alan and nothing else. A tree quietly holding a
					// row twice looks exactly like a sound one from a shell too.
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
			// A failed read leaves the last good tree on screen. Blanking it would turn a transient
			// failure into "there are no initiatives", which is a claim this cannot make.
			//
			// BUT ON THE FIRST READ THERE IS NO LAST GOOD TREE, and an empty panel is exactly what a
			// memory repository holding no initiatives would look like. `message` draws above the rows
			// whether or not there are any, so the two stop being the same picture. Alan read the
			// empty one on 2026-08-13 and had no way to tell without opening this channel.
			view.message = unreachableMessage(err);
			output.appendLine(`[${trigger}] read failed: ${String(err)}`);
			recordObservation(FEATURE, { outcome: 'failed', failure: String(err) });
		}
		return undefined;
	};

	const settled = createSettledRefresh(SETTLE_MS, refresh);

	/**
	 * Takes the colours again and repaints the tree already on screen, without re-reading the corpus.
	 *
	 * WHY THIS IS NOT `refresh`. A row's colour is the turn state of whatever seats hold it, and that
	 * moves whenever any seat starts or ends a turn. Re-reading the whole tree on each of those would
	 * ask for every initiative page again, re-run this panel's own duplicate check and re-publish its
	 * observation — all to move a colour on one line.
	 *
	 * NOTHING ON SCREEN YET MEANS NOTHING TO REPAINT. Until the first read has answered there are no
	 * rows to take colours against, and the read that is coming carries its own.
	 *
	 * A FAILURE HERE LEAVES THE COLOURS THAT STAND. The tree is not in doubt — only this repaint
	 * failed — so the reason goes to the output channel and the rows keep the last colours they were
	 * given. Putting it in `view.message` would report the whole panel as unreadable over a colour.
	 */
	const repaint = async (trigger: string): Promise<undefined> => {
		if (standing === undefined) { return undefined; }
		try {
			const next = recolour(standing, await readWorkColours());
			// NOTHING MOVED IS THE ORDINARY ANSWER, for the reason `recolour` states.
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

	/**
	 * Watches the seat files, so a turn starting or ending anywhere recolours the rows it is on.
	 *
	 * ARMED AT ACTIVATION RATHER THAN FROM THE FIRST READ, unlike the corpus watch below. Where the
	 * seats stand is answered by `seatDirs()` without asking the harness anything, so there is nothing
	 * to wait for, and `repaint` holds off by itself until there is a tree to colour.
	 *
	 * THE SAME DIRECTORY AND THE SAME PATTERN THE TAB STRIP AND THE AGENTS PANEL WATCH, taken from
	 * `seat/turn-color.ts` so that where a seat's turn is written is spelled once for all three.
	 */
	context.subscriptions.push(
		settledSeats,
		...seatDirs().map((dir) => {
			const seats = vscode.workspace.createFileSystemWatcher(
				new vscode.RelativePattern(vscode.Uri.file(dir), SEAT_SIDECAR_GLOB)
			);
			// ALL THREE, AND DELETION IS THE ONE THIS CANNOT DO WITHOUT. A seat's sidecar goes when the
			// seat stops, and stopping is exactly when its rows must stop being drawn as live.
			seats.onDidChange(() => settledSeats.request('seat written'));
			seats.onDidCreate(() => settledSeats.request('seat added'));
			seats.onDidDelete(() => settledSeats.request('seat removed'));
			return seats;
		})
	);

	/**
	 * Watches the akasha repository, so an initiative written there re-reads this view.
	 *
	 * THE REPOSITORY IS TAKEN FROM THE TREE'S OWN ANSWER rather than from a path held here, for the
	 * reason `harness.ts` states: where the akasha repository sits is the harness's fact, and a
	 * second copy of it in this extension would be a second thing to be wrong. It follows that there
	 * is no watch until a read has succeeded, which costs nothing — until then there is no tree on
	 * screen for a watch to keep current.
	 *
	 * ARMED ONCE AND NEVER SWAPPED. The repository does not move under a running window, and a
	 * second watcher over the same files would ask for two reads per write.
	 */
	let watched: string | undefined;
	const watchCorpus = (named: string): undefined => {
		if (watched !== undefined) { return undefined; }
		// SPELLED THE WAY THE WORKSPACE SPELLS IT, WHICH THIS PANEL IS THE REASON FOR. The roots are
		// built from `$HOME` and answer `/home/walton/repos/akasha`, where the workspace holds
		// `/var/home/walton/repos/akasha` — one directory, two spellings. `harness-call` holds the
		// measurement.
		const repo = repositoryPath(named);
		watched = repo;
		/**
		 * A WRITE DROPS THE HELD ANSWERS BEFORE IT ASKS FOR THE READ. The page queries beneath this
		 * panel are held for a minute at a time, so that four panels reading at once work out the cache
		 * keys once between them; nothing in that hold watches the disk. So the event saying the corpus
		 * moved is the event that has to say the hold is stale, or the re-read it triggers answers out
		 * of the hold with the very rows that changed.
		 */
		const moved = (why: string) => (): void => {
			dropDerivers();
			settled.request(why);
		};
		const watcher = vscode.workspace.createFileSystemWatcher(
			new vscode.RelativePattern(vscode.Uri.file(repo), CORPUS_GLOB)
		);
		context.subscriptions.push(
			watcher,
			// ALL THREE, AND DELETION IS THE ONE THIS PANEL CANNOT DO WITHOUT. An initiative's
			// document is removed when it is finished, so a view answering only to edits would hold
			// every finished initiative on screen for as long as the window stayed open.
			watcher.onDidChange(moved('written')),
			watcher.onDidCreate(moved('added')),
			watcher.onDidDelete(moved('removed'))
		);
		output.appendLine(`watching ${repo}/${CORPUS_GLOB}, re-reading ${SETTLE_MS}ms after it settles`);
		return undefined;
	};

	context.subscriptions.push(
		settled,
		// The filter bar's answer is this extension's to give, for the reason the Domains panel
		// states at length and `tree-filter.ts` holds the measurement for.
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
