/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import type { WorkColours, WorkNode, WorkTree } from './harness.ts';

/**
 * The colour this answer gives a row OF ITS OWN, or null where it gives none.
 *
 * What a row with no colour of its own draws instead comes from `raised`.
 */
function colourFor(node: WorkNode, colours: WorkColours): string | null {
	return colours.byInitiative[node.key] ?? null;
}

/**
 * The ranking a row's colour is raised to, highest first.
 *
 * WRITTEN OVER EVERY ROW RATHER THAN OVER SOME OF THEM. A row with no seat of its own carries the
 * highest colour beneath it, wherever it sits. Naming particular rows here would have to be
 * revisited every time the tree's levels change.
 *
 * A COLOUR OUTSIDE THIS LIST RANKS BELOW ALL OF IT rather than being refused. The corpus is free to
 * give a turn state a colour this has never heard of, and the panel drawing it a shade too low beats
 * the panel throwing.
 */
const COLOUR_RANK: readonly string[] = ['green', 'blue', 'yellow'];

/** The higher of two colours by that ranking, where null is no colour at all. */
function raised(one: string | null, other: string | null): string | null {
	if (one === null) { return other; }
	if (other === null) { return one; }
	const rankOf = (colour: string): number => {
		const at = COLOUR_RANK.indexOf(colour);
		return at === -1 ? COLOUR_RANK.length : at;
	};
	return rankOf(one) <= rankOf(other) ? one : other;
}

/**
 * Every row carrying the highest colour of itself and everything beneath it.
 *
 * WHY A ROW'S OWN COLOUR IS IN THE COMPARISON and not just its children's. A row that holds a seat
 * AND has children is both, and taking the children's alone would drop the row's own state on the
 * floor — a working parent under a waiting child would draw as waiting.
 */
export function rollUp(nodes: readonly WorkNode[]): readonly WorkNode[] {
	return nodes.map((node) => {
		const children = rollUp(node.children);
		let colour = node.colour;
		for (const child of children) { colour = raised(colour, child.colour); }
		return { ...node, colour, children };
	});
}

/**
 * The same tree with every row's colour taken from this answer, or undefined where not one moved.
 *
 * UNDEFINED IS THE ORDINARY ANSWER AND IS WHY THIS REPORTS IT. A seat's sidecar is written whenever
 * anything about its turn moves, which is far more often than a colour actually changes, and the
 * panel is asked to repaint on every one of those. Rebuilding the tree and firing the provider each
 * time would redraw every row in the view to change nothing.
 *
 * A ROW THE ANSWER NO LONGER NAMES GOES BACK TO NONE, which is the case that matters most. A seat
 * finishing is exactly when its rows must stop being drawn as live, and an answer carrying only what
 * IS drawn says that by leaving the row out rather than by naming it — so the colour has to be taken
 * from the answer for every row, not merged onto the rows the answer happens to mention.
 */
export function recolour(tree: WorkTree, colours: WorkColours): WorkTree | undefined {
	let moved = false;
	const walk = (nodes: readonly WorkNode[]): readonly WorkNode[] =>
		nodes.map((node) => {
			const children = walk(node.children);
			let colour = colourFor(node, colours);
			for (const child of children) { colour = raised(colour, child.colour); }
			if (colour !== node.colour) { moved = true; }
			return { ...node, colour, children };
		});
	const roots = walk(tree.roots);
	return moved ? { repo: tree.repo, roots } : undefined;
}
