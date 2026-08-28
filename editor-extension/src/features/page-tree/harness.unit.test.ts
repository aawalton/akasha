import { describe, expect, test } from 'bun:test';
import type { Ask } from '../../../../readouts/readout-resolver.ts';
import { askQuery, countPages, countRows, documentPath, parseAnswer, readPageTree } from "./harness.ts"
import { type PageNode, type QueryRow, assemblePageTree } from "./assemble.ts";

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

const answer = (rows: readonly QueryRow[]) =>
	({ n: rows.length, rows, value: null, over: null, faults: [], omitted: [], unfound: [] });

const serving = (byslug: Readonly<Record<string, readonly QueryRow[]>>): Ask =>
	(slug) => Promise.resolve(answer(byslug[slug] ?? []));

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

	test('a query that cannot be answered is an error naming the query', async () => {
		const refusing: Ask = () => Promise.reject(new Error('no page query is named `page-type-all`'));
		await expect(askQuery('page-type-all', refusing)).rejects.toThrow(/page-type-all went unasked/);
		await expect(askQuery('page-type-all', refusing)).rejects.toThrow(/no page query is named/);
	});
});

describe('readPageTree', () => {
	test('asks every query and nests what they answer', async () => {
		const tree = await readPageTree(WHOLE);
		expect(tree.roots.map((one) => one.id)).toEqual(['type/page', 'vocabulary']);
		expect(countPages(tree.roots)).toBe(3);
	});

	test('one query failing fails the read rather than drawing a tree missing its rows', async () => {
		const half: Ask = (slug) =>
			slug === 'page-property-definition-all'
				? Promise.reject(new Error('page-property-definition-all could not be answered'))
				: Promise.resolve(answer([]));
		await expect(readPageTree(half)).rejects.toThrow(/page-property-definition-all/);
	});

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

	test('a row naming a repository this cannot place has no path rather than one into nowhere', () => {
		const tree = rooted({ at: 'books:shelf/one.md', values: { slug: 'one', 'extends-slug': 'none' } });
		expect(documentPath(tree, tree.roots[0] as PageNode)).toBeUndefined();
	});

	test('a row that opens nothing has no path rather than a path into nowhere', () => {
		const group = (TREE.roots[0] as PageNode).children[0] as PageNode;
		expect(group.label).toBe('properties');
		expect(documentPath(TREE, group)).toBeUndefined();
	});
});
