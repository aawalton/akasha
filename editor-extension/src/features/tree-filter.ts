export interface FilteredTree<T> {
	readonly roots: readonly T[];
	readonly matchCount: number;
}

export function filterTree<T>(
	roots: readonly T[],
	childrenOf: (node: T) => readonly T[],
	matches: (node: T) => boolean,
	rebuild: (node: T, children: readonly T[]) => T
): FilteredTree<T> {
	let matchCount = 0;

	const walk = (nodes: readonly T[]): T[] => {
		const kept: T[] = [];
		for (const node of nodes) {
			const children = walk(childrenOf(node));
			const hit = matches(node);
			if (hit) {
				matchCount += 1;
			}
			if (hit || children.length > 0) {
				kept.push(rebuild(node, children));
			}
		}
		return kept;
	};

	const result = walk(roots);
	return { roots: result, matchCount };
}

export function textMatches(pattern: string, ...fields: readonly (string | null | undefined)[]): boolean {
	const needle = pattern.trim().toLowerCase();
	if (needle === '') {
		return true;
	}
	return fields.some((field) => typeof field === 'string' && field.toLowerCase().includes(needle));
}
