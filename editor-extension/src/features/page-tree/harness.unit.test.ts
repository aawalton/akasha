/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * What this extension will and will not accept from the page query service.
 *
 * THE BOUNDARY MOVED AND THESE MOVED WITH IT. This used to parse a tree another repository's command
 * had already composed. The service answers rows now, so what these hold is that a changed envelope
 * is refused rather than half-read, and that one query failing takes the whole read down. The shape
 * built out of the rows is `assemble.unit.test.ts`.
 */
import { describe, expect, test } from 'bun:test';
import { type Fetcher, askQuery, countPages, countRows, documentPath, parseAnswer, readPageTree } from "./harness"
import { type PageNode, type QueryRow, assemblePageTree } from "./assemble";

const REPO = '/home/walton/repos/akasha';

const TYPES: readonly QueryRow[] = [
	{ at: 'akasha:pages/page-type/page.md', values: { slug: 'page', 'extends-slug': 'none' } },
	{ at: 'akasha:pages/page-type/domain.md', values: { slug: 'domain', 'extends-slug': 'page' } },
];

const PROPERTIES: readonly QueryRow[] = [
	{
		at: 'akasha:pages/page-property-definition/page-body.md',
		values: { slug: 'page-body', key: 'body', 'defined-on-slug': 'page', type: 'template' },
	},
];

const answer = (rows: readonly QueryRow[]) => ({ n: rows.length, rows });

/** Every query answers, each with the rows its name calls for and nothing else. */
const serving = (byslug: Readonly<Record<string, readonly QueryRow[]>>): Fetcher =>
	async (url) => {
		const slug = url.slice(url.lastIndexOf('/') + 1);
		return { ok: true, status: 200, json: async () => answer(byslug[slug] ?? []) } as unknown as Response;
	};

const WHOLE = serving({ 'page-type-all': TYPES, 'page-property-definition-all': PROPERTIES });

const TREE = assemblePageTree(
	{ types: TYPES, properties: PROPERTIES, propertyTypes: [], domains: [] },
	REPO
);

describe('parseAnswer', () => {
	test('reads the rows out of the service envelope', () => {
		expect(parseAnswer(answer(TYPES), 'page-type-all')).toHaveLength(2);
	});

	test('an envelope missing its rows is refused, naming the query rather than crashing', () => {
		expect(() => parseAnswer({ n: 3 }, 'page-type-all')).toThrow(/page-type-all/);
		expect(() => parseAnswer({ n: 3 }, 'page-type-all')).toThrow(/shape this cannot read/);
	});

	test('a row with no `at` is refused, because `at` is the only place a path comes from', () => {
		expect(() => parseAnswer({ n: 1, rows: [{ values: { slug: 'page' } }] }, 'page-type-all'))
			.toThrow(/shape this cannot read/);
	});

	test('what is not an envelope at all is refused rather than read as no pages', () => {
		expect(() => parseAnswer({ error: 'no such query' }, 'page-type-all')).toThrow(/shape this cannot read/);
	});
});

describe('askQuery', () => {
	test('answers the rows the service sent', async () => {
		expect(await askQuery('page-type-all', WHOLE)).toHaveLength(2);
	});

	test('a service that is down is an error naming the query and the url', async () => {
		const dead: Fetcher = async () => { throw new Error('connect ECONNREFUSED 127.0.0.1:8787'); };
		await expect(askQuery('page-type-all', dead)).rejects.toThrow(/page-type-all went unasked/);
		await expect(askQuery('page-type-all', dead)).rejects.toThrow(/8787/);
	});

	test('a refusal is reported with its status rather than read as no pages', async () => {
		const refusing: Fetcher = async () => ({ ok: false, status: 404 }) as unknown as Response;
		await expect(askQuery('page-type-all', refusing)).rejects.toThrow(/replied 404/);
	});

	test('a body that is not JSON is an error rather than a crash inside the tree', async () => {
		const notJson: Fetcher = async () =>
			({ ok: true, status: 200, json: async () => { throw new Error('bad'); } }) as unknown as Response;
		await expect(askQuery('page-type-all', notJson)).rejects.toThrow(/is not JSON/);
	});
});

describe('readPageTree', () => {
	test('asks every query and nests what they answer', async () => {
		const tree = await readPageTree(WHOLE);
		expect(tree.roots.map((one) => one.id)).toEqual(['type/page', 'vocabulary']);
		expect(countPages(tree.roots)).toBe(3);
	});

	/**
	 * HALF AN ANSWER IS NOT A SMALLER TREE, IT IS A WRONG ONE — every type that defines a property
	 * drawn bare, or every subtype of a missing parent reported unreached — so one query failing has
	 * to take the whole read down rather than resolve.
	 */
	test('one query failing fails the read rather than drawing a tree missing its rows', async () => {
		const half: Fetcher = async (url) =>
			url.endsWith('page-property-definition-all')
				? ({ ok: false, status: 500 }) as unknown as Response
				: ({ ok: true, status: 200, json: async () => answer([]) }) as unknown as Response;
		await expect(readPageTree(half)).rejects.toThrow(/page-property-definition-all/);
	});

	/**
	 * A page type is anything whose OWN page type reaches `page-type`, so the types arrive from two
	 * queries and the properties from two more. A read that dropped the second of either pair would
	 * lose rows silently, which is the whole reason both are named.
	 */
	test('the two queries answering page types are merged rather than one winning', async () => {
		const served = serving({
			'page-type-all': TYPES,
			'rules-engine-rule-set-all': [
				{
					at: 'akasha:pages/rules-engine-rule-set/email-rule.md',
					values: { slug: 'email-rule', 'extends-slug': 'page' },
				},
			],
		});
		const tree = await readPageTree(served);
		expect(tree.roots[0]?.children.map((one) => one.label)).toEqual(['domain', 'email-rule']);
	});

	test('the two queries answering property definitions are merged the same way', async () => {
		const served = serving({
			'page-type-all': TYPES,
			'page-property-definition-all': PROPERTIES,
			'alan-harness-tracking-field-all': [
				{
					at: 'akasha:pages/alan-harness-tracking-field/page-woke.md',
					values: { slug: 'page-woke', key: 'woke', 'defined-on-slug': 'page', type: 'number' },
				},
			],
		});
		const tree = await readPageTree(served);
		expect(tree.roots[0]?.children[0]?.children.map((one) => one.label)).toEqual(['body', 'woke']);
	});
});

describe('countRows', () => {
	test('counts every row and not just the roots', () => {
		expect(countRows(TREE.roots)).toBe(5);
	});

	/**
	 * The number beside the title is held against what the filter matched, and the filter matches on
	 * any row's own text — including the rows that open nothing. This is the assertion that keeps the
	 * two numbers on one scale.
	 */
	test('a row that opens nothing is still a row it drew', () => {
		expect(countRows(TREE.roots)).toBeGreaterThan(countPages(TREE.roots));
	});

	test('an empty tree is zero rather than an error', () => {
		expect(countRows([])).toBe(0);
	});
});

describe('countPages', () => {
	test('counts only the rows standing for a document', () => {
		expect(countPages(TREE.roots)).toBe(3);
	});

	test('an empty tree is zero rather than an error', () => {
		expect(countPages([])).toBe(0);
	});
});

const rooted = (row: QueryRow) =>
	assemblePageTree({ types: [row], properties: [], propertyTypes: [], domains: [] }, REPO);

describe('documentPath', () => {
	test('opens a row under the repository the row itself names', () => {
		expect(documentPath(TREE, TREE.roots[0] as PageNode))
			.toMatch(/\/akasha\/pages\/page-type\/page\.md$/);
	});

	/**
	 * WHY A ROW CARRIES ITS REPOSITORY AT ALL. `books` was absorbed into akasha and its checkout is
	 * gone, so a row still naming it names a repository this cannot place. Undefined is the whole
	 * point: a root answered for it would build a path into a missing directory, and the row would be
	 * drawn with an open command that fails after Alan has already clicked it.
	 */
	test('a row naming a repository this cannot place has no path rather than one into nowhere', () => {
		const tree = rooted({ at: 'books:shelf/one.md', values: { slug: 'one', 'extends-slug': 'none' } });
		expect(documentPath(tree, tree.roots[0] as PageNode)).toBeUndefined();
	});

	/**
	 * What keeps a grouping row from carrying an open command. A path built anyway would be
	 * `<repo>/null` or the repository directory itself, and both are a click that fails after Alan has
	 * already made it.
	 */
	test('a row that opens nothing has no path rather than a path into nowhere', () => {
		const group = (TREE.roots[0] as PageNode).children[0] as PageNode;
		expect(group.label).toBe('properties');
		expect(documentPath(TREE, group)).toBeUndefined();
	});
});
