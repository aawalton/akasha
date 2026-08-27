/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * What this extension will and will not accept from the harness verb.
 *
 * The boundary is the point: `ops domain champions --tree --json` is another area's command,
 * changed by seats that never open this file. What these assert is that a changed shape
 * arrives here as a stated error rather than as a tree built out of `undefined`.
 */
import { describe, expect, test } from 'bun:test';
import { countDomains, type DomainNode, documentPath, parseDomainTree } from './harness';

const ONE_ROOT = JSON.stringify({
	repo: '/home/walton/repos/akasha',
	roots: [
		{
			slug: 'global',
			relPath: 'domains/global.md',
			persona: 'aine',
			position: null,
			children: [
				{ slug: 'code', relPath: 'domains/code.md', persona: 'aine', position: 2, children: [] },
				{
					slug: 'person',
					relPath: 'domains/person.md',
					persona: 'aine',
					position: 1,
					children: [
						{
							slug: 'alan',
							relPath: 'domains/persons/alan.md',
							persona: 'amy',
							position: null,
							children: [],
						},
					],
				},
			],
		},
	],
	unreached: [],
});

describe('parseDomainTree', () => {
	test('reads the nesting the verb printed, to whatever depth it goes', () => {
		const tree = parseDomainTree(ONE_ROOT);
		expect(tree.repo).toBe('/home/walton/repos/akasha');
		expect(tree.roots).toHaveLength(1);
		expect(countDomains(tree.roots)).toBe(4);
		const person = tree.roots[0]?.children.find((one) => one.slug === 'person');
		expect(person?.children[0]?.slug).toBe('alan');
		expect(person?.children[0]?.persona).toBe('amy');
	});

	test('a domain no persona answers for is null rather than missing', () => {
		const tree = parseDomainTree(
			JSON.stringify({
				repo: '/r',
				roots: [{ slug: 'a', relPath: 'a.md', persona: null, position: null, children: [] }],
				unreached: [],
			})
		);
		expect(tree.roots[0]?.persona).toBeNull();
	});

	test('a place the verb printed is carried through, and a null one stays null', () => {
		const tree = parseDomainTree(ONE_ROOT);
		const drawn = tree.roots[0]?.children.map((one) => [one.slug, one.position]);
		expect(drawn).toEqual([
			['code', 2],
			['person', 1],
		]);
		expect(tree.roots[0]?.position).toBeNull();
	});

	test('a place that is not a whole number above zero is refused rather than drawn', () => {
		const shaped = (position: unknown) =>
			JSON.stringify({
				repo: '/r',
				roots: [{ slug: 'a', relPath: 'a.md', persona: null, position, children: [] }],
				unreached: [],
			});
		expect(() => parseDomainTree(shaped(0))).toThrow('shape this cannot read');
		expect(() => parseDomainTree(shaped(1.5))).toThrow('shape this cannot read');
		expect(() => parseDomainTree(shaped('1'))).toThrow('shape this cannot read');
	});

	test('carries the unreached list, so a corpus fault can be said rather than shown as absence', () => {
		const tree = parseDomainTree(JSON.stringify({ repo: '/r', roots: [], unreached: ['a', 'b'] }));
		expect(tree.unreached).toEqual(['a', 'b']);
	});

	test('output that is not JSON is an error naming the verb, not a crash inside the tree', () => {
		expect(() => parseDomainTree('error: no such flag\n')).toThrow(/did not print JSON/);
	});

	test('a node missing a field this reads is refused whole rather than half-built', () => {
		const missingPersona = JSON.stringify({
			repo: '/r',
			roots: [{ slug: 'a', relPath: 'a.md', children: [] }],
			unreached: [],
		});
		expect(() => parseDomainTree(missingPersona)).toThrow(/shape this cannot read/);
	});

	test('a shape defect nested deep is refused as surely as one at the top', () => {
		const deep = JSON.stringify({
			repo: '/r',
			roots: [
				{
					slug: 'a',
					relPath: 'a.md',
					persona: 'aine',
					position: null,
					children: [{ slug: '', relPath: 'b.md', persona: 'aine', position: null, children: [] }],
				},
			],
			unreached: [],
		});
		expect(() => parseDomainTree(deep)).toThrow(/shape this cannot read/);
	});
});

describe('countDomains', () => {
	test('counts every row and not just the roots', () => {
		expect(countDomains(parseDomainTree(ONE_ROOT).roots)).toBe(4);
	});

	test('an empty tree is zero rather than an error', () => {
		expect(countDomains([])).toBe(0);
	});
});

describe('documentPath', () => {
	test('joins the relative path onto the repo the verb named', () => {
		const tree = parseDomainTree(ONE_ROOT);
		const node = tree.roots[0] as DomainNode;
		expect(documentPath(tree, node)).toBe('/home/walton/repos/akasha/domains/global.md');
	});
});
