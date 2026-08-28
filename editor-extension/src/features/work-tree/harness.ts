/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The work tree, ASKED FOR rather than worked out here, as the Domains panel beside it does.
 *
 * WHY NOTHING IN THIS FILE WALKS THE CORPUS. Every edge in this tree is declared at the child and
 * nothing lists its children: an initiative names the initiative it stands under. So the tree exists
 * only after the whole corpus has been read and those edges inverted — there is no walk down from an
 * initiative asking what stands under it, and expanding a row cannot fetch its children, because no
 * row knows them. `ops akasha work-tree --json` does that inversion in the akasha repository,
 * beside the corpus and beside the schemas that say which way the edges point. A traversal written
 * here would be a second answer to which initiative sits under which, free to drift from the
 * repository's own, and the one nobody watches.
 *
 * PARSED RATHER THAN CAST, for the reason the domain tree's harness states: this crosses a process
 * boundary, and a shape check turns a verb that changed underneath us into a message in the output
 * channel rather than a tree half-built out of `undefined`.
 */

import * as path from 'node:path';
import { z } from 'zod';
import { runOps, runVerb, verbPath } from '../../harness-call.ts';
import { rollUp } from './colours.ts';

/**
 * The ceiling on the read. It parses every document in the akasha repository — which takes a second
 * or so; past a minute the call has not worked, and saying so beats a panel that never fills. A wait
 * with no ceiling reports neither success nor failure.
 */
const READ_TIMEOUT_MS = 60_000;

/** The tree runs to a few hundred kilobytes of JSON. This is room to grow into, not a fit. */
const MAX_BUFFER = 8 * 1024 * 1024;

/**
 * One row and everything beneath it.
 *
 * EVERY ROW IS AN INITIATIVE. An initiative stands under another initiative or under none, so the
 * tree goes as deep as the corpus declares rather than through a fixed set of levels. Every path in
 * this tree is taken against the akasha root the verb named.
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
	/** The repository the paths above are relative to. The verb says which, so nothing here decides. */
	readonly repo: string;
	readonly roots: readonly WorkNode[];
}

/**
 * A row as the verb prints it, before its colour's two spellings are folded to one.
 *
 * WHY THERE IS A SHAPE HERE THAT IS NOT `WorkNode`. `ops akasha work-tree --json` spells this field
 * `colour` today and will spell it `color`. A build Alan is running was compiled against whichever
 * spelling stood when it was built, so this reader has to accept the new name BEFORE the verb starts
 * sending it — a schema demanding the old one alone would refuse every row on the commit that
 * renamed the key, and `parseWorkTree` answers a refusal by throwing, which leaves the Work panel
 * holding its last tree or, on the first read after a restart, holding nothing.
 * `pages/domain/readout-system.md` puts the ordering as Field Retirement: a rename is a drop, and a
 * drop comes after the readout stopped reading the field.
 *
 * THE FOLD IS NOT DONE IN THE SCHEMA. A recursive zod schema names itself through a getter, and a
 * transform on it would have to restate the whole node's type to keep that getter well typed. The
 * shape is read as it arrives and folded by `foldColours` below, where the rule is one line and the
 * refusal of a row carrying neither key is legible.
 */
interface RawWorkNode {
	readonly key: string;
	readonly label: string;
	readonly relPath: string | null;
	readonly detail: string | null;
	readonly note: string | null;
	readonly color?: string | null;
	readonly colour?: string | null;
	readonly children: readonly RawWorkNode[];
}

// Recursive by getter, which is how a zod schema names itself before it is assigned.
const WORK_NODE_SCHEMA: z.ZodType<RawWorkNode> = z.object({
	key: z.string().min(1),
	label: z.string().min(1),
	relPath: z.string().min(1).nullable(),
	detail: z.string().nullable(),
	note: z.string().nullable(),
	color: z.string().nullable().optional(),
	colour: z.string().nullable().optional(),
	get children() {
		return z.array(WORK_NODE_SCHEMA);
	},
});

const WORK_TREE_SCHEMA = z.object({
	repo: z.string().min(1),
	roots: z.array(WORK_NODE_SCHEMA),
});

/**
 * Every row's colour under the one spelling the rest of this panel reads.
 *
 * A ROW CARRYING NEITHER KEY IS REFUSED, which is the reading tolerance must not cost. `undefined`
 * is not a colour and not an absence of one — a row holding no seat states `null` — so a row with
 * neither key is a verb answering a shape this was not written for, and it is thrown on with the
 * same words the schema's own refusal carries, because it is the same fault.
 *
 * THE NEW SPELLING WINS WHERE BOTH STAND, so a verb sending the pair through one release hands this
 * the key it will be left with rather than the one going away.
 */
function foldColours(nodes: readonly RawWorkNode[]): readonly WorkNode[] {
	return nodes.map((node) => {
		const colour = node.color !== undefined ? node.color : node.colour;
		if (colour === undefined) {
			throw new Error(
				'ops akasha work-tree --json printed a shape this cannot read: ' +
				`row \`${node.key}\` carries its colour under neither \`color\` nor \`colour\``
			);
		}
		return {
			key: node.key,
			label: node.label,
			relPath: node.relPath,
			detail: node.detail,
			note: node.note,
			colour,
			children: foldColours(node.children),
		};
	});
}

/**
 * The verb's answer, or a stated reason it is not usable.
 *
 * A THROW RATHER THAN AN EMPTY TREE. An empty tree is a claim — that the corpus holds no
 * initiatives — and this is never in a position to make it. The caller keeps the last good tree on screen and
 * writes the reason to its output channel.
 */
export function parseWorkTree(stdout: string): WorkTree {
	let value: unknown;
	try {
		value = JSON.parse(stdout);
	} catch (err) {
		throw new Error(`ops akasha work-tree --json did not print JSON: ${String(err)}`);
	}
	const parsed = WORK_TREE_SCHEMA.safeParse(value);
	if (!parsed.success) {
		throw new Error(
			`ops akasha work-tree --json printed a shape this cannot read: ${parsed.error.message}`
		);
	}
	// The command answers a colour for the rows that carry one of their own. Raising the rows above
	// them is this panel's, and it happens here so the FIRST paint carries it — leaving it to
	// `recolour` would draw the tree flat until a seat's sidecar happened to move.
	return { repo: parsed.data.repo, roots: rollUp(foldColours(parsed.data.roots)) };
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
 * Joined against the repo the verb named rather than against a path this extension holds: where the
 * akasha repository sits is the harness's fact, and a second copy of it here would be a second
 * thing to be wrong.
 */
export function documentPath(tree: WorkTree, node: WorkNode): string | undefined {
	return node.relPath === null ? undefined : path.join(tree.repo, node.relPath);
}

/**
 * Runs the verb through `harness-call`, which is where this extension decides what environment a
 * harness call runs in. This used to wrap the call in `/bin/bash -lc` on the belief that a login
 * shell put `bun` on the PATH for the `ops` shebang; it does not, and that is what left this panel
 * empty on 2026-08-13. See that file for the measurement.
 */
export async function readWorkTree(): Promise<WorkTree> {
	const stdout = await runOps(['akasha', 'work-tree', '--json'], {
		timeout: READ_TIMEOUT_MS,
		maxBuffer: MAX_BUFFER,
	});
	return parseWorkTree(stdout);
}

/**
 * The ceiling on the colours ask. Tighter than the tree's because this opens no document in the
 * corpus — it reads the seat files and nothing else — and because it runs on every turn anything in
 * the fleet takes. Past this it is stuck rather than slow.
 */
const COLOURS_TIMEOUT_MS = 5_000;

/**
 * The colours alone, keyed the way a row's `key` is keyed.
 *
 * WHY THIS IS A SECOND ASK RATHER THAN THE TREE AGAIN. A row's colour is the turn state of whatever
 * seats hold it, and that moves whenever any seat starts or ends a turn — far more often than the
 * corpus is written. Asking for the whole tree on each of those walks every document in the akasha
 * repository, tens of thousands of them against the couple of dozen that can draw a row, to move a
 * colour on one line. This asks the same command for the half of its answer that reads only the seat
 * files.
 *
 * KEYED, AND THAT IS WHY NO ROW HAS TO NAME A SEAT. An initiative answers to its slug, which is what
 * the row already carries. A row is not drawn for one seat either — several may hold one initiative,
 * and the command folds them down to the liveliest before it answers. Carrying a seat name on the
 * row would be wrong the moment a second seat held it; carrying the set would put that fold in this
 * panel, as a second copy of a decision the corpus already makes.
 */
export interface WorkColours {
	readonly repo: string;
	readonly byInitiative: Readonly<Record<string, string>>;
}

const WORK_COLOURS_SCHEMA = z.object({
	repo: z.string().min(1),
	byInitiative: z.record(z.string(), z.string()),
});

/** The answer, or a stated reason it is not usable, for the reason `parseWorkTree` states. */
export function parseWorkColours(stdout: string): WorkColours {
	let value: unknown;
	try {
		value = JSON.parse(stdout);
	} catch (err) {
		throw new Error(`ops akasha work-tree --colours did not print JSON: ${String(err)}`);
	}
	const parsed = WORK_COLOURS_SCHEMA.safeParse(value);
	if (!parsed.success) {
		throw new Error(
			`ops akasha work-tree --colours printed a shape this cannot read: ${parsed.error.message}`
		);
	}
	return parsed.data;
}


/**
 * Runs the same command as `readWorkTree`, asking only for the half that reads the seat files.
 *
 * THE COMMAND FILE RATHER THAN `ops`, WHICH IS THE WHOLE DIFFERENCE ON THIS PATH. The dispatcher
 * resolves the command surface and emits a metric on every invocation, and until 2026-08-22 it
 * awaited a live database insert before the process could exit — measured at 55-95ms on top of a
 * read that costs 30ms. The insert is detached now, but the dispatcher still costs what it costs,
 * and this is the one call in this panel that a person is waiting on. `readWorkTree` below keeps
 * `ops`: it spawns a whole-corpus read either way, and 50ms against that is nothing.
 *
 * THE TAB STRIP AND THE AGENTS PANEL ALREADY REACH THE HARNESS THIS WAY. Both resolve their
 * colours through `runVerb`, which is why they were the two surfaces that stayed fast while this
 * one did not.
 */
export async function readWorkColours(): Promise<WorkColours> {
	const stdout = await runVerb(verbPath('work-tree'), ['--colours'], {
		timeout: COLOURS_TIMEOUT_MS,
		maxBuffer: MAX_BUFFER,
	});
	return parseWorkColours(stdout);
}
