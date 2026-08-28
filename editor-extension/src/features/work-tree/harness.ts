/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The work tree, ASKED FOR rather than worked out here, as the Domains panel beside it does.
 *
 * WHY NOTHING IN THIS FILE WALKS THE CORPUS. Every edge in this tree is declared at the child and
 * nothing lists its children: an initiative names the initiative it stands under. So the tree exists
 * only after every initiative has been read and those edges inverted — there is no walk down from an
 * initiative asking what stands under it, and expanding a row cannot fetch its children, because no
 * row knows them. `workTree` does that inversion, beside the corpus and beside the schemas that say
 * which way the edges point. A traversal written here would be a second answer to which initiative
 * sits under which, free to drift from the repository's own, and the one nobody watches.
 *
 * WHY IT NO LONGER SPAWNS `ops`. The verb read every document in the repository to answer. The rows
 * are asked of the pages now, one query over `initiative`, answered from the same held deriver every
 * other panel in this process reads through.
 *
 * WHY THERE IS NOTHING LEFT TO PARSE, AND NO TWO SPELLINGS TO FOLD. The shape check here guarded a
 * process boundary, and a boundary that is gone needs no guard. The two spellings it tolerated —
 * `color` from the composer, `colour` in this panel — meet in one line below rather than in a schema
 * that had to accept both because a build might be compiled against either.
 */

import * as path from 'node:path';
import { duringOneCall } from '../../../../during-call/during-call.ts';
import { type Node, workTree } from '../../../../tools/lib/work-tree.ts';
import { askedInitiatives } from '../../../../tools/lib/work-tree-asked.ts';
import { drawnNow } from '../../../../tools/lib/work-tree-drawn.ts';
import { AKASHA, resolveRoots, rootFor } from '../../../../repo/roots/roots.ts';
import { rollUp } from './colours.ts';

/**
 * One row and everything beneath it.
 *
 * EVERY ROW IS AN INITIATIVE. An initiative stands under another initiative or under none, so the
 * tree goes as deep as the corpus declares rather than through a fixed set of levels. Every path in
 * this tree is taken against the akasha root beside it.
 */
export interface WorkNode {
	/** The initiative's slug, unique across the tree. */
	readonly key: string;
	readonly label: string;
	/** The document this row opens, or null for a sentinel, which is no document. */
	readonly relPath: string | null;
	/** Shown beside the label. */
	readonly detail: string | null;
	/** Why this row sits where it does, where that is not what its own keys say. */
	readonly note: string | null;
	/**
	 * The colour of the seat working this row, or null where no seat states it.
	 *
	 * A NAME, NOT A SHADE. Which colour a seat's turn state takes stands in the akasha
	 * repository on that state's own domain; what the name looks like is this editor's, contributed
	 * in its manifest.
	 */
	readonly colour: string | null;
	readonly children: readonly WorkNode[];
}

export interface WorkTree {
	/** The repository the paths above are relative to. */
	readonly repo: string;
	readonly roots: readonly WorkNode[];
}

/** The composer spells this `color`; every reader below it spells it `colour`. */
function named(nodes: readonly Node[]): readonly WorkNode[] {
	return nodes.map((node) => ({
		key: node.key,
		label: node.label,
		relPath: node.relPath,
		detail: node.detail,
		note: node.note,
		colour: node.color,
		children: named(node.children),
	}));
}

/**
 * How many rows the tree holds.
 *
 * WHAT THE COUNT BESIDE THE TITLE HAS TO BE. The filter matches on any row's own text, so the
 * number it leaves standing counts every row drawn. Counting some subset against it would put a
 * matched row over a total that never contained it.
 */
export function countRows(nodes: readonly WorkNode[]): number {
	let total = 0;
	for (const node of nodes) {
		total += 1 + countRows(node.children);
	}
	return total;
}

/**
 * Every key in the tree, in the order the rows stand.
 *
 * SEPARATE FROM THE COUNT because the question they answer is different. A count says how many rows
 * were drawn; this says which, and a row drawn twice — the shape a parent edge goes wrong in —
 * raises the count and shows up nowhere else.
 */
export function workKeys(nodes: readonly WorkNode[]): readonly string[] {
	return nodes.flatMap((node) => [node.key, ...workKeys(node.children)]);
}

/**
 * The absolute path of a row's document, or undefined where the row is a sentinel and has none.
 *
 * Joined against the repo the tree names rather than against a path this extension holds: where the
 * akasha repository sits is the harness's fact, and a second copy of it here would be a second
 * thing to be wrong.
 */
export function documentPath(tree: WorkTree, node: WorkNode): string | undefined {
	return node.relPath === null ? undefined : path.join(tree.repo, node.relPath);
}

/**
 * The tree, composed in this process.
 *
 * ONE CALL AROUND THE WHOLE READ, for the reason the Domains panel states: what a page query costs
 * is mostly working out the cache keys it is held against, and those are held for the length of a
 * call and no longer.
 *
 * THE COLOURS ARE RAISED HERE AND NOT IN THE COMPOSER. It answers a colour for the rows that carry
 * one of their own; lifting them to the parents above is this panel's, and it happens on the read so
 * the FIRST paint carries it — left to `recolour` the tree would draw flat until a seat's sidecar
 * happened to move.
 */
export async function readWorkTree(): Promise<WorkTree> {
	const roots = resolveRoots();
	return duringOneCall(async () => ({
		repo: rootFor(roots, AKASHA),
		roots: rollUp(named(workTree(askedInitiatives(roots), drawnNow()))),
	}));
}

/**
 * The colours alone, keyed the way a row's `key` is keyed.
 *
 * WHY THIS IS A SECOND READ RATHER THAN THE TREE AGAIN. A row's colour is the turn state of whatever
 * seats hold it, and that moves whenever any seat starts or ends a turn — far more often than the
 * corpus is written. This reads the seat files and nothing else, so a turn moving a colour on one
 * line costs none of the initiative pages the whole tree reads.
 *
 * KEYED, AND THAT IS WHY NO ROW HAS TO NAME A SEAT. An initiative answers to its slug, which is what
 * the row already carries. A row is not drawn for one seat either — several may hold one initiative,
 * and `drawnNow` folds them down to the liveliest before it answers. Carrying a seat name on the row
 * would be wrong the moment a second seat held it; carrying the set would put that fold in this
 * panel, as a second copy of a decision the corpus already makes.
 */
export interface WorkColours {
	readonly repo: string;
	readonly byInitiative: Readonly<Record<string, string>>;
}

export async function readWorkColours(): Promise<WorkColours> {
	const roots = resolveRoots();
	return duringOneCall(async () => ({
		repo: rootFor(roots, AKASHA),
		byInitiative: Object.fromEntries(drawnNow().byInitiative),
	}));
}
