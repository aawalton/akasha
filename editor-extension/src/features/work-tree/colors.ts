import type { WorkColors, WorkNode, WorkTree } from './harness.ts';

function colorFor(node: WorkNode, colors: WorkColors): string | null {
	return colors.byInitiative[node.key] ?? null;
}

const COLOR_RANK: readonly string[] = ['green', 'blue', 'yellow'];

function raised(one: string | null, other: string | null): string | null {
	if (one === null) { return other; }
	if (other === null) { return one; }
	const rankOf = (color: string): number => {
		const at = COLOR_RANK.indexOf(color);
		return at === -1 ? COLOR_RANK.length : at;
	};
	return rankOf(one) <= rankOf(other) ? one : other;
}

export function rollUp(nodes: readonly WorkNode[]): readonly WorkNode[] {
	return nodes.map((node) => {
		const children = rollUp(node.children);
		let color = node.color;
		for (const child of children) { color = raised(color, child.color); }
		return { ...node, color, children };
	});
}

export function recolor(tree: WorkTree, colors: WorkColors): WorkTree | undefined {
	let moved = false;
	const walk = (nodes: readonly WorkNode[]): readonly WorkNode[] =>
		nodes.map((node) => {
			const children = walk(node.children);
			let color = colorFor(node, colors);
			for (const child of children) { color = raised(color, child.color); }
			if (color !== node.color) { moved = true; }
			return { ...node, color, children };
		});
	const roots = walk(tree.roots);
	return moved ? { repo: tree.repo, roots } : undefined;
}
