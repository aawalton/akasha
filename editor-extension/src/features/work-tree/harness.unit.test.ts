import { describe, expect, test } from 'bun:test';
import { type WorkNode, type WorkTree, countRows, documentPath, workKeys } from './harness.ts';
import { recolour, rollUp } from './colours.ts';

const TREE: WorkTree = {
	repo: '/home/walton/repos/memory',
	roots: [
		{
			key: 'aine-trusted-agents',
			label: 'aine-trusted-agents',
			relPath: 'pages/initiative/aine-trusted-agents.md',
			detail: 'aine',
			note: null,
			colour: null,
			children: [
				{
					key: 'nimue-seats-backed-by-files',
					label: 'nimue-seats-backed-by-files',
					relPath: 'pages/initiative/nimue-seats-backed-by-files.md',
					detail: 'nimue',
					note: null,
					colour: null,
					children: [
						{
							key: 'thea-code-names-no-ops',
							label: 'thea-code-names-no-ops',
							relPath: 'pages/initiative/thea-code-names-no-ops.md',
							detail: 'thea',
							note: null,
							colour: null,
							children: [
								{
									key: 'vera-graph-stands-outside-the-code',
									label: 'vera-graph-stands-outside-the-code',
									relPath: 'pages/initiative/vera-graph-stands-outside-the-code.md',
									detail: 'vera',
									note: null,
									colour: null,
									children: [],
								},
							],
						},
					],
				},
			],
		},
		{
			key: 'amy-stoplights-drive-behaviour',
			label: 'amy-stoplights-drive-behaviour',
			relPath: null,
			detail: 'amy',
			note: 'drawn as a root: it names parent gone-initiative, which has no document',
			colour: null,
			children: [],
		},
	],
};

describe('countRows', () => {
	test('counts every row at every depth, because that is what the filter it is shown against counts', () => {
		expect(countRows(TREE.roots)).toBe(5);
		expect(countRows(TREE.roots)).toBe(workKeys(TREE.roots).length);
	});

	test('an empty tree is nothing rather than an error', () => {
		expect(countRows([])).toBe(0);
	});
});

describe('workKeys', () => {
	test('names every row drawn, which is what makes a repeat visible at all', () => {
		expect([...workKeys(TREE.roots)].sort()).toEqual([
			'aine-trusted-agents',
			'amy-stoplights-drive-behaviour',
			'nimue-seats-backed-by-files',
			'thea-code-names-no-ops',
			'vera-graph-stands-outside-the-code',
		]);
	});

	test('a row drawn under two parents shows up twice, which a count alone would hide', () => {
		const twice: WorkTree = {
			repo: '/x',
			roots: [
				{
					key: 'top',
					label: 'top',
					relPath: null,
					detail: null,
					note: null,
					colour: null,
					children: [
						{ key: '1', label: '1', relPath: 'pages/initiative/1.md', detail: null, note: null, colour: null, children: [] },
						{ key: '1', label: '1', relPath: 'pages/initiative/1.md', detail: null, note: null, colour: null, children: [] },
					],
				},
			],
		};
		const keys = workKeys(twice.roots);
		expect(keys.filter((key, at) => keys.indexOf(key) !== at)).toEqual(['1']);
	});
});

describe('documentPath', () => {
	test('joins against the repo the tree names rather than a path held here', () => {
		expect(documentPath(TREE, TREE.roots[0]!.children[0]!)).toBe(
			'/home/walton/repos/memory/pages/initiative/nimue-seats-backed-by-files.md'
		);
	});

	test('a row with no document says so rather than composing a path with null in it', () => {
		expect(documentPath(TREE, TREE.roots[1]!)).toBeUndefined();
	});
});

const COLOURED: WorkTree = {
	repo: '/x',
	roots: [
		{
			key: 'athena-consistent-seats',
			label: 'athena-consistent-seats',
			relPath: 'pages/initiative/athena-consistent-seats.md',
			detail: 'athena',
			note: null,
			colour: 'green',
			children: [
				{
					key: 'athena-seats-read-their-own',
					label: 'athena-seats-read-their-own',
					relPath: 'pages/initiative/athena-seats-read-their-own.md',
					detail: 'athena',
					note: null,
					colour: 'green',
					children: [],
				},
			],
		},
	],
};

const NOTHING_DRAWN = { repo: '/x', byInitiative: {} };

describe('recolour', () => {
	test('a row takes the colour filed under its slug, which is the key it already carries', () => {
		const next = recolour(COLOURED, {
			repo: '/x',
			byInitiative: { 'athena-seats-read-their-own': 'blue' },
		});
		expect(next?.roots[0]!.children[0]!.colour).toBe('blue');
	});

	test('a parent takes the colour filed under its own slug', () => {
		const next = recolour(COLOURED, {
			repo: '/x',
			byInitiative: { 'athena-consistent-seats': 'yellow' },
		});
		expect(next?.roots[0]!.colour).toBe('yellow');
	});

	test('a seat finishing takes the colour off its rows rather than leaving the last one standing', () => {
		const next = recolour(COLOURED, NOTHING_DRAWN);
		expect(next?.roots[0]!.colour).toBeNull();
		expect(next?.roots[0]!.children[0]!.colour).toBeNull();
	});

	test('a slug no row carries tints nothing rather than colouring some row near it', () => {
		const next = recolour(COLOURED, { repo: '/x', byInitiative: { 'nobody-here': 'red' } });
		expect(next?.roots[0]!.children[0]!.colour).toBeNull();
		expect(next?.roots[0]!.colour).toBeNull();
	});

	test('nothing moved is reported as nothing, so the view is not redrawn to change no row', () => {
		expect(recolour(COLOURED, {
			repo: '/x',
			byInitiative: { 'athena-consistent-seats': 'green', 'athena-seats-read-their-own': 'green' },
		})).toBeUndefined();
	});

	test('a row keeps its key, so the workbench does not collapse the branch it stands in', () => {
		const next = recolour(COLOURED, NOTHING_DRAWN);
		expect(next?.roots[0]!.children[0]!.key).toBe('athena-seats-read-their-own');
	});
});

const row = (key: string, colour: string | null, children: readonly WorkNode[] = []): WorkNode => ({
	key,
	label: key,
	relPath: null,
	detail: null,
	note: null,
	colour,
	children,
});

describe('rollUp', () => {
	test('a row with no colour of its own carries the one beneath it', () => {
		const [parent] = rollUp([row('parent', null, [row('child', 'yellow')])]);
		expect(parent!.colour).toBe('yellow');
	});

	test('green outranks blue, which outranks yellow', () => {
		const [parent] = rollUp([
			row('parent', null, [row('a', 'yellow'), row('b', 'green'), row('c', 'blue')]),
		]);
		expect(parent!.colour).toBe('green');
		const [lower] = rollUp([row('parent', null, [row('a', 'yellow'), row('b', 'blue')])]);
		expect(lower!.colour).toBe('blue');
	});

	test('a colour the ranking never named sits below every colour it did', () => {
		const [parent] = rollUp([row('parent', null, [row('a', 'purple'), row('b', 'yellow')])]);
		expect(parent!.colour).toBe('yellow');
	});

	test('a row holding a seat keeps its own colour where nothing beneath it ranks higher', () => {
		const [parent] = rollUp([row('parent', 'green', [row('child', 'yellow')])]);
		expect(parent!.colour).toBe('green');
	});

	test('a colour climbs every level, not just the one above it', () => {
		const [top] = rollUp([row('top', null, [row('middle', null, [row('deep', 'blue')])])]);
		expect(top!.colour).toBe('blue');
		expect(top!.children[0]!.colour).toBe('blue');
	});

	test('a row with nothing coloured beneath it stays uncoloured', () => {
		const [parent] = rollUp([row('parent', null, [row('child', null)])]);
		expect(parent!.colour).toBeNull();
	});
});
