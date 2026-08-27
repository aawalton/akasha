/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The domain championing tree, ASKED FOR rather than worked out here.
 *
 * WHY NOTHING IN THIS FILE WALKS THE CORPUS. Two graphs stand over those documents.
 * `domain-parents:` admits several values and many domains use several, so a view drawn
 * from that edge shows those domains once per parent — `tools/dag.ts` draws exactly that, and
 * draws it correctly. `champion-persona:` picks the one
 * parent championing descends, and that edge is a tree: one line per domain. A traversal written here
 * would be a second answer to who champions what, free to drift from the repository's own, and
 * it would be the one nobody watches. So `ops domain champions --tree --json` is called
 * and its answer is parsed.
 *
 * PARSED RATHER THAN CAST. This crosses a process boundary. A shape check here turns a
 * verb that changed underneath us into a message in the output channel, where a cast
 * would turn it into a tree half-built out of `undefined`.
 */

import * as path from 'node:path';
import { z } from 'zod';
import { runOps } from '../../harness-call';

/**
 * The ceiling on the read. It scans every document in the repository, which takes a
 * second or so; past a minute the call has not worked, and saying so beats a panel that
 * never fills. A wait with no ceiling reports neither success nor failure.
 */
const READ_TIMEOUT_MS = 60_000;

/** The tree runs to a few hundred kilobytes of JSON. This is room to grow into, not a fit. */
const MAX_BUFFER = 8 * 1024 * 1024;

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
	/** The repository the paths below are relative to. The verb says which, so nothing here decides. */
	readonly repo: string;
	readonly roots: readonly DomainNode[];
	/** Domains no root reaches. Empty in a sound corpus; carried so a fault can be said out loud. */
	readonly unreached: readonly string[];
}

// Recursive by getter, which is how a zod schema names itself before it is assigned.
const DOMAIN_NODE_SCHEMA: z.ZodType<DomainNode> = z.object({
	slug: z.string().min(1),
	relPath: z.string().min(1),
	persona: z.string().nullable(),
	position: z.number().int().positive().nullable(),
	get children() {
		return z.array(DOMAIN_NODE_SCHEMA);
	},
});

const DOMAIN_TREE_SCHEMA = z.object({
	repo: z.string().min(1),
	roots: z.array(DOMAIN_NODE_SCHEMA),
	unreached: z.array(z.string()),
});

/**
 * The verb's answer, or a stated reason it is not usable.
 *
 * A THROW RATHER THAN AN EMPTY TREE. An empty tree is a claim — that the corpus holds no
 * domains — and this is never in a position to make it. The caller keeps the last good
 * tree on screen and writes the reason to its output channel.
 */
export function parseDomainTree(stdout: string): DomainTree {
	let value: unknown;
	try {
		value = JSON.parse(stdout);
	} catch (err) {
		throw new Error(`ops domain champions --tree --json did not print JSON: ${String(err)}`);
	}
	const parsed = DOMAIN_TREE_SCHEMA.safeParse(value);
	if (!parsed.success) {
		throw new Error(
			`ops domain champions --tree --json printed a shape this cannot read: ${parsed.error.message}`
		);
	}
	return parsed.data;
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
 * Joined against the repo the verb named rather than against a path this extension holds:
 * where that repository sits is the harness's fact, and a second copy of it here would be a
 * second thing to be wrong.
 */
export function documentPath(tree: DomainTree, node: DomainNode): string {
	return path.join(tree.repo, node.relPath);
}

/**
 * Runs the verb through `harness-call`, which is where this extension decides what environment a
 * harness call runs in. This used to wrap the call in `/bin/bash -lc` on the belief that a login
 * shell put `bun` on the PATH for the `ops` shebang; it does not, and that is what left this panel
 * empty on 2026-08-13. See that file for the measurement.
 */
export async function readDomainTree(): Promise<DomainTree> {
	const stdout = await runOps(['domain', 'champions', '--tree', '--json'], {
		timeout: READ_TIMEOUT_MS,
		maxBuffer: MAX_BUFFER,
	});
	return parseDomainTree(stdout);
}
