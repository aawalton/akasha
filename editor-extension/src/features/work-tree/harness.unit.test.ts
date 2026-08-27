/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * What this extension will and will not accept from the harness verb.
 *
 * The boundary is the point, as it is for the domain tree beside this one: `ops memory
 * work-tree --json` is another repository's command, changed by seats that never open this
 * file. What these assert is that a changed shape arrives here as a stated error rather than as a
 * tree built out of `undefined`.
 *
 * THE SENTINEL ROW IS WHY `relPath` IS NULLABLE HERE AND NOT IN THE DOMAIN TREE. `no-initiative`
 * is a real row standing for what declared nothing, so it has no document. A
 * schema demanding a path would refuse the verb's ordinary output; a click handler assuming one
 * would open a path with `null` in it. Both arms are pinned below.
 */
import { describe, expect, test } from 'bun:test';
import { type WorkNode, type WorkTree, countRows, documentPath, parseWorkColours, parseWorkTree, workKeys } from "./harness"
import { recolour, rollUp } from "./colours";

const TREE = JSON.stringify({
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
});

describe('parseWorkTree', () => {
	test('reads the nesting the verb printed, to whatever depth it goes', () => {
		const tree = parseWorkTree(TREE);
		expect(tree.roots[0]?.children[0]?.children[0]?.children[0]?.key).toBe(
			'vera-graph-stands-outside-the-code'
		);
	});

	test('carries the repo the verb resolved, rather than leaving the caller to hold one', () => {
		expect(parseWorkTree(TREE).repo).toBe('/home/walton/repos/memory');
	});

	test('a row with no document is accepted, that being the verb`s ordinary output', () => {
		const bare = parseWorkTree(TREE).roots[1];
		expect(bare?.key).toBe('amy-stoplights-drive-behaviour');
		expect(bare?.relPath).toBeNull();
	});

	test('a row keeps the note saying why it sits where it does', () => {
		const orphan = parseWorkTree(TREE).roots[1];
		expect(orphan?.note).toBe(
			'drawn as a root: it names parent gone-initiative, which has no document'
		);
	});

	test('output that is not JSON is a stated error rather than a broken tree', () => {
		expect(() => parseWorkTree('bun: command not found\n')).toThrow(/did not print JSON/);
	});

	test('a shape this cannot read is a stated error, naming that it was the shape', () => {
		expect(() => parseWorkTree(JSON.stringify({ roots: [] }))).toThrow(/shape this cannot read/);
	});

	test('a row missing a field the tree draws is refused rather than built out of undefined', () => {
		const wrong = JSON.stringify({
			repo: '/home/walton/repos/memory',
			roots: [{ key: 'x', label: 'x', relPath: null, detail: null, note: null, children: [] }],
		});
		expect(() => parseWorkTree(wrong)).toThrow(/shape this cannot read/);
	});

	test('an empty tree is read as empty rather than refused, the corpus being allowed to be empty', () => {
		expect(parseWorkTree(JSON.stringify({ repo: '/x', roots: [] })).roots).toHaveLength(0);
	});

	// WHY THE ROW'S COLOUR IS READ UNDER TWO SPELLINGS. The verb spells the field `colour` today and
	// will spell it `color`. Alan runs a build compiled against whichever spelling stood when it was
	// built, so the reader has to take the new name before the verb starts sending it — a build that
	// read only the old one would refuse every row on the renaming commit, and this panel answers a
	// refusal by keeping its last tree, or by drawing nothing at all on the first read after a
	// restart. An empty Work panel and a healthy empty corpus look identical.
	test('reads a row spelling its colour the way the verb is being renamed to spell it', () => {
		const renamed = JSON.stringify({
			repo: '/x',
			roots: [{ key: 'x', label: 'x', relPath: null, detail: null, note: null, color: 'green', children: [] }],
		});
		expect(parseWorkTree(renamed).roots[0]?.colour).toBe('green');
	});

	test('takes the new spelling where a row carries both', () => {
		const both = JSON.stringify({
			repo: '/x',
			roots: [{ key: 'x', label: 'x', relPath: null, detail: null, note: null, color: 'green', colour: 'yellow', children: [] }],
		});
		expect(parseWorkTree(both).roots[0]?.colour).toBe('green');
	});

	test('reads the new spelling at every depth, not only at the root', () => {
		const nested = JSON.stringify({
			repo: '/x',
			roots: [{
				key: 'top', label: 'top', relPath: null, detail: null, note: null, color: null,
				children: [{ key: 'deep', label: 'deep', relPath: null, detail: null, note: null, color: 'blue', children: [] }],
			}],
		});
		const tree = parseWorkTree(nested);
		expect(tree.roots[0]?.children[0]?.colour).toBe('blue');
		// And the raise still runs over the folded rows rather than over the raw ones.
		expect(tree.roots[0]?.colour).toBe('blue');
	});

	test('a row stating no colour under the new spelling states none rather than being refused', () => {
		const none = JSON.stringify({
			repo: '/x',
			roots: [{ key: 'x', label: 'x', relPath: null, detail: null, note: null, color: null, children: [] }],
		});
		expect(parseWorkTree(none).roots[0]?.colour).toBeNull();
	});

	test('a row carrying the colour under neither spelling is still refused', () => {
		const neither = JSON.stringify({
			repo: '/x',
			roots: [{ key: 'x', label: 'x', relPath: null, detail: null, note: null, children: [] }],
		});
		expect(() => parseWorkTree(neither)).toThrow(/shape this cannot read/);
	});
});

describe('countRows', () => {
	test('counts every row at every depth, because that is what the filter it is shown against counts', () => {
		const tree = parseWorkTree(TREE);
		expect(countRows(tree.roots)).toBe(5);
		expect(countRows(tree.roots)).toBe(workKeys(tree.roots).length);
	});

	test('an empty tree is nothing rather than an error', () => {
		expect(countRows([])).toBe(0);
	});
});

describe('workKeys', () => {
	test('names every row drawn, which is what makes a repeat visible at all', () => {
		expect([...workKeys(parseWorkTree(TREE).roots)].sort()).toEqual([
			'aine-trusted-agents',
			'amy-stoplights-drive-behaviour',
			'nimue-seats-backed-by-files',
			'thea-code-names-no-ops',
			'vera-graph-stands-outside-the-code',
		]);
	});

	test('a row drawn under two parents shows up twice, which a count alone would hide', () => {
		const twice = JSON.stringify({
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
		});
		const keys = workKeys(parseWorkTree(twice).roots);
		expect(keys.filter((key, at) => keys.indexOf(key) !== at)).toEqual(['1']);
	});
});

describe('documentPath', () => {
	test('joins against the repo the verb named rather than a path held here', () => {
		const tree = parseWorkTree(TREE);
		expect(documentPath(tree, tree.roots[0]!.children[0]!)).toBe(
			'/home/walton/repos/memory/pages/initiative/nimue-seats-backed-by-files.md'
		);
	});

	test('a row with no document says so rather than composing a path with null in it', () => {
		const tree = parseWorkTree(TREE);
		expect(documentPath(tree, tree.roots[1]!)).toBeUndefined();
	});
});

/**
 * What a repaint will and will not do to the rows already on screen.
 *
 * THE COLOUR IS TAKEN FROM THE ANSWER FOR EVERY ROW, never merged onto the rows the answer happens
 * to mention. A seat finishing is reported by its rows dropping OUT of the answer, so a repaint that
 * only wrote the keys it was given would leave a finished seat drawn as live for as long as the
 * window stayed open — and a row drawn in the wrong turn's colour looks exactly like a right one.
 */
const COLOURED: WorkTree = {
	repo: '/x',
	roots: [
		{
			key: 'athena-consistent-seats',
			label: 'athena-consistent-seats',
			relPath: 'pages/initiative/athena-consistent-seats.md',
			detail: 'athena',
			note: null,
			// Raised off the green beneath it as well as held of its own.
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

/** A row carrying only what the ranking looks at. */
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

describe('parseWorkColours', () => {
	test('the record and the repo come through as they were printed', () => {
		const parsed = parseWorkColours('{"repo":"/x","byInitiative":{"held":"green"}}');
		expect(parsed.byInitiative).toEqual({ held: 'green' });
		expect(parsed.repo).toBe('/x');
	});

	test('a shape this cannot read is a stated error rather than rows built out of undefined', () => {
		expect(() => parseWorkColours('{"repo":"/x","byInitiative":{"held":7}}')).toThrow();
	});

	test('a command answering something other than JSON says so', () => {
		expect(() => parseWorkColours('command not found')).toThrow();
	});
});
