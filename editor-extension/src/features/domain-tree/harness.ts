/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The domain championing tree, ASKED FOR rather than worked out here.
 *
 * WHY NOTHING IN THIS FILE WALKS THE CORPUS. Two graphs stand over those documents.
 * `domain-parent-slug:` admits several values and many domains use several, so a view drawn
 * from that edge shows those domains once per parent — `tools/dag.ts` draws exactly that, and
 * draws it correctly. `persona-champion-slug:` picks the one parent championing descends, and that
 * edge is a tree: one line per domain. A traversal written here would be a second answer to who
 * champions what, free to drift from the repository's own, and it would be the one nobody watches.
 * So `championTree` is called — the same function `ops domain champions --tree` composes with.
 *
 * WHY IT NO LONGER SPAWNS `ops`. The verb read every document in the repository to answer, and
 * from this panel that cost 18.3s of an activation on 2026-08-27, with the agent tree stuck behind
 * it. The rows are asked of the pages now, one query per domain kind, answered from the same held
 * deriver every other panel in this process reads through: 2.9s on the first ask and 96ms after.
 *
 * WHY THERE IS NOTHING LEFT TO PARSE. The shape check here guarded a process boundary, and a
 * boundary that is gone needs no guard: `championTree` answers a `ChampionTree` or throws, and
 * TypeScript is what says the shape is right.
 */

import * as path from 'node:path';
import { duringOneCall } from '../../../../during-call/during-call.ts';
import { askedDomainRows } from '../../../../tools/lib/champions-asked.ts';
import { championTree } from '../../../../tools/lib/champions-tree.ts';
import { AKASHA, resolveRoots, rootFor } from '../../../../repo/roots/roots.ts';

/** One domain and everything owned beneath it. */
export interface DomainNode {
	readonly slug: string;
	readonly relPath: string;
	/** The persona the descent reaches, or null where it reaches none. */
	readonly persona: string | null;
	/**
	 * This domain's 1-based place in its parent's `sequence-slugs:`, or null where the parent
	 * named no order or did not name this child. What the row's `n-` prefix is drawn from.
	 */
	readonly position: number | null;
	readonly children: readonly DomainNode[];
}

export interface DomainTree {
	/** The repository the paths below are relative to. */
	readonly repo: string;
	readonly roots: readonly DomainNode[];
	/** Domains no root reaches. Empty in a sound corpus; carried so a fault can be said out loud. */
	readonly unreached: readonly string[];
}

/** Every row in the tree, which is what makes "each domain once" a number rather than a hope. */
export function countDomains(nodes: readonly DomainNode[]): number {
	let total = 0;
	for (const node of nodes) {
		total += 1 + countDomains(node.children);
	}
	return total;
}

/**
 * The absolute path of a domain's document.
 *
 * Joined against the repo the tree names rather than against a path this extension holds:
 * where that repository sits is the harness's fact, and a second copy of it here would be a
 * second thing to be wrong.
 */
export function documentPath(tree: DomainTree, node: DomainNode): string {
	return path.join(tree.repo, node.relPath);
}

/**
 * The tree, composed in this process.
 *
 * ONE CALL AROUND THE WHOLE READ. A page query is held against the file tree, the page type
 * registry and the shape mark taken over both, and each of those is held for the length of a call
 * and no longer. This asks once per domain kind — 45 of them — so outside a call it would work all
 * three out 45 times over, in git subprocesses.
 */
export async function readDomainTree(): Promise<DomainTree> {
	const roots = resolveRoots();
	return duringOneCall(async () => {
		const { roots: composed, unreached } = championTree(askedDomainRows(roots));
		return { repo: rootFor(roots, AKASHA), roots: composed, unreached };
	});
}
