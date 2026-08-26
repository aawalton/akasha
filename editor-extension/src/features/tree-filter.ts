/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Narrowing a tree this extension already holds, for the filter bar the three panels carry.
 *
 * WHY THE FILTERING HAPPENS HERE AND NOT IN THE WORKBENCH. A tree view fetches its rows as they
 * are expanded, so the workbench's own filter can only match rows somebody has already opened. The
 * Domains panel opens with one row — `global`, collapsed — over a corpus of a couple of thousand
 * documents, so typing there matched one row and reported "No results found" for words matching
 * hundreds. Measured, not guessed: expanding everything first made the same word narrow the tree
 * correctly. These panels each read their whole tree from `ops` in one call and hold it in memory,
 * so the pattern is answered here in one pass over what is already there, with nothing fetched.
 *
 * NOTHING HERE IMPORTS `vscode`, so it can be held against a test runner with no workbench — the
 * same reason `settled-refresh` beside it does not.
 */

/** What a match keeps beside itself, so a row is readable rather than floating loose. */
export interface FilteredTree<T> {
	readonly roots: readonly T[];
	/** Rows that matched the pattern themselves, as against ancestors kept to carry them. */
	readonly matchCount: number;
}

/**
 * Every node whose text matches, each still standing under the ancestors that lead to it.
 *
 * ANCESTORS ARE KEPT AND COUNTED SEPARATELY. A match nine levels down is unreadable without the
 * path to it, and a tree that dropped the path would be a flat list wearing a tree's indentation.
 * They are not matches, so they are not counted as any — a count that included them would answer
 * "how many rows are on screen", which the reader can already see.
 *
 * A MATCHED NODE KEEPS ONLY ITS MATCHING DESCENDANTS. Keeping the whole subtree under a match
 * would put the entire corpus back on screen the moment somebody typed a letter that a root
 * happens to contain.
 */
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

/**
 * Whether a row's text answers what the reader typed.
 *
 * CONTIGUOUS AND CASE-INSENSITIVE, rather than the fuzzy matching the workbench's own filter uses.
 * Fuzzy matching earns its place where a reader is guessing at a name; these rows are slugs the
 * reader has read before, and fuzzy over two thousand of them returns a long tail of rows sharing
 * a few letters in order — which reads as the filter being broken rather than as it being clever.
 *
 * EVERY FIELD THE ROW SHOWS, so a reader filtering on something they can see on screen is never
 * told there are no results. Typing a persona narrows the Domains panel to what she answers for.
 */
export function textMatches(pattern: string, ...fields: readonly (string | null | undefined)[]): boolean {
	const needle = pattern.trim().toLowerCase();
	if (needle === '') {
		return true;
	}
	return fields.some((field) => typeof field === 'string' && field.toLowerCase().includes(needle));
}
