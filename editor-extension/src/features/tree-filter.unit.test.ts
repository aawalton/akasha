import { describe, expect, test } from 'bun:test';
import { filterTree, textMatches } from './tree-filter.ts';

interface Node {
	readonly slug: string;
	readonly persona: string | null;
	readonly children: readonly Node[];
}

const node = (slug: string, persona: string | null, ...children: Node[]): Node => ({ slug, persona, children });

const CORPUS: readonly Node[] = [
	node('global', 'aine',
		node('foundational-layers', 'aine',
			node('agent-harness', 'athena',
				node('seat', 'athena'),
				node('memory', 'athena')
			),
			node('code-harness', 'dalla'),
			node('infra', 'aranya')
		),
		node('product', null,
			node('calendar', 'amy')
		)
	),
];

const slugsOf = (nodes: readonly Node[]): string[] => {
	const out: string[] = [];
	const walk = (list: readonly Node[]): undefined => {
		for (const n of list) {
			out.push(n.slug);
			walk(n.children);
		}
		return undefined;
	};
	walk(nodes);
	return out;
};

const narrow = (pattern: string) => filterTree<Node>(
	CORPUS,
	(n) => n.children,
	(n) => textMatches(pattern, n.slug, n.persona),
	(n, children) => ({ ...n, children })
);

describe('narrowing a tree the panels already hold', () => {
	test('a match two levels down keeps the ancestors that lead to it', () => {
		const result = narrow('code-harness');
		expect(slugsOf(result.roots)).toEqual(['global', 'foundational-layers', 'code-harness']);
	});

	test('a branch with nothing matching in it goes entirely', () => {
		const result = narrow('infra');
		expect(slugsOf(result.roots)).not.toContain('product');
		expect(slugsOf(result.roots)).not.toContain('agent-harness');
	});

	test('ancestors kept to carry a match are not counted as matches', () => {
		const result = narrow('code-harness');
		expect(slugsOf(result.roots)).toHaveLength(3);
		expect(result.matchCount).toBe(1);
	});

	test('a matched node keeps only its matching descendants', () => {
		const result = narrow('agent-harness');
		expect(slugsOf(result.roots)).toEqual(['global', 'foundational-layers', 'agent-harness']);
	});

	test('a pattern nothing matches empties the tree rather than passing it through', () => {
		const result = narrow('zzqq');
		expect(result.roots).toEqual([]);
		expect(result.matchCount).toBe(0);
	});

	test('matching runs over every field a row shows, not the label alone', () => {
		const result = narrow('aranya');
		expect(slugsOf(result.roots)).toEqual(['global', 'foundational-layers', 'infra']);
		expect(result.matchCount).toBe(1);
	});
});

describe('deciding whether a row answers what was typed', () => {
	test('case does not matter in either direction', () => {
		expect(textMatches('HARNESS', 'agent-harness')).toBe(true);
		expect(textMatches('harness', 'AGENT-HARNESS')).toBe(true);
	});

	test('matching is contiguous rather than fuzzy', () => {
		expect(textMatches('ahs', 'agent-harness')).toBe(false);
		expect(textMatches('t-har', 'agent-harness')).toBe(true);
	});

	test('a field a row does not carry is skipped rather than throwing', () => {
		expect(textMatches('amy', 'product', null)).toBe(false);
		expect(textMatches('product', 'product', null)).toBe(true);
	});

	test('an empty pattern matches everything, which is how clearing the bar restores the tree', () => {
		expect(textMatches('', 'anything')).toBe(true);
		expect(textMatches('   ', 'anything')).toBe(true);
	});
});
