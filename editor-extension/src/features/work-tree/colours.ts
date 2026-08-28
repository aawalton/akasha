import type { WorkColours, WorkNode, WorkTree } from './harness.ts';

function colourFor(node: WorkNode, colours: WorkColours): string | null {
	return colours.byInitiative[node.key] ?? null;
}

const COLOUR_RANK: readonly string[] = ['green', 'blue', 'yellow'];

function raised(one: string | null, other: string | null): string | null {
	if (one === null) { return other; }
	if (other === null) { return one; }
	const rankOf = (colour: string): number => {
		const at = COLOUR_RANK.indexOf(colour);
		return at === -1 ? COLOUR_RANK.length : at;
	};
	return rankOf(one) <= rankOf(other) ? one : other;
}

export function rollUp(nodes: readonly WorkNode[]): readonly WorkNode[] {
	return nodes.map((node) => {
		const children = rollUp(node.children);
		let colour = node.colour;
		for (const child of children) { colour = raised(colour, child.colour); }
		return { ...node, colour, children };
	});
}

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
