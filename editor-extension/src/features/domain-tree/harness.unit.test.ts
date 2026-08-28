/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * What this panel makes of a tree it has been handed.
 *
 * WHAT IS NO LONGER TESTED HERE: that a changed shape from `ops domain champions --tree --json`
 * arrives as a stated error rather than as a tree built out of `undefined`. There is no longer a
 * process between this panel and the tree — `championTree` composes it in this process and
 * TypeScript says what shape it is — so there is no boundary for a shape to change across, and a
 * parser guarding one would be code with nothing on the other side of it.
 */
import { describe, expect, test } from 'bun:test';
import { countDomains, type DomainNode, type DomainTree, documentPath } from './harness.ts';

const ONE_ROOT: DomainTree = {
	repo: '/home/walton/repos/akasha',
	roots: [
		{
			slug: 'global',
			relPath: 'pages/domain/global.domain.md',
			persona: 'aine',
			position: null,
			children: [
				{ slug: 'code', relPath: 'pages/domain/code.domain.md', persona: 'aine', position: 2, children: [] },
				{
					slug: 'person',
					relPath: 'pages/domain/person.domain.md',
					persona: 'aine',
					position: 1,
					children: [
						{
							slug: 'alan',
							relPath: 'pages/domain/alan.domain.md',
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
};

describe('countDomains', () => {
	test('counts every row at every depth, not just the roots', () => {
		expect(countDomains(ONE_ROOT.roots)).toBe(4);
	});

	test('an empty tree is zero rather than an error', () => {
		expect(countDomains([])).toBe(0);
	});
});

describe('documentPath', () => {
	test('joins the relative path onto the repo the tree names', () => {
		const node = ONE_ROOT.roots[0] as DomainNode;
		expect(documentPath(ONE_ROOT, node)).toBe('/home/walton/repos/akasha/pages/domain/global.domain.md');
	});

	test('a domain deep in the tree is placed against the same repo as a root', () => {
		const person = ONE_ROOT.roots[0]?.children.find((one) => one.slug === 'person') as DomainNode;
		const alan = person.children[0] as DomainNode;
		expect(documentPath(ONE_ROOT, alan)).toBe('/home/walton/repos/akasha/pages/domain/alan.domain.md');
	});
});
