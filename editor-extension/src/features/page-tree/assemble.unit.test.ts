/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The nesting, held to a fixture.
 *
 * THIS IS THE PART THAT CAN NOW BE WRONG. The tree used to arrive composed and all this extension
 * did was refuse a bad shape; the shaping is here now, so what these assert is the shape itself —
 * what nests under what, in which order, under which id, and what is reported rather than drawn.
 */
import { describe, expect, test } from 'bun:test';
import { type PageAnswers, type PageNode, type QueryRow, assemblePageTree } from './assemble';

const at = (rel: string) => `akasha:${rel}`;

/** A page type row, as `page-type-all` answers one. */
const type = (slug: string, extendsSlug: string): QueryRow => ({
	at: at(`pages/page-type/${slug}.md`),
	values: { slug, 'extends-slug': extendsSlug },
});

/** A property definition row, as `page-property-definition-all` answers one. */
const property = (slug: string, key: string, on: string, propertyType: string | null): QueryRow => ({
	at: at(`pages/page-property-definition/${slug}.md`),
	values: { slug, key, 'defined-on-slug': on, type: propertyType },
});

/** A property type row, as `page-property-type-all` answers one. */
const propertyType = (
	typeSlug: string,
	kind: string,
	rest: { suffix?: string; of?: string; value?: string } = {}
): QueryRow => ({
	at: at(`pages/page-property-type/page-property-type-${typeSlug}.md`),
	values: {
		'type-slug': typeSlug,
		kind,
		suffix: rest.suffix ?? null,
		of: rest.of ?? null,
		value: rest.value ?? null,
	},
});

/** A domain row, as `domain-all` answers one. */
const domain = (slug: string): QueryRow => ({ at: at(`pages/domain/${slug}.md`), values: { slug } });

const REPO = '/home/walton/repos/akasha';

const answers = (given: Partial<PageAnswers>): PageAnswers => ({
	types: [],
	properties: [],
	propertyTypes: [],
	domains: [],
	...given,
});

/**
 * Both trees in miniature: page types under `page`, and a vocabulary of three kinds beside them.
 *
 * BOTH KINDS OF ROW COME OUT OF IT — rows that open a document, and the scaffolding rows that open
 * nothing. The second is what the counts and the open-command guard turn on, so a fixture holding
 * only the first would pass every test here while the panel offered Alan a click that opens
 * `<repo>/null`.
 */
const WHOLE: PageAnswers = answers({
	types: [type('page', 'none'), type('domain', 'page'), type('page-property-type', 'domain')],
	properties: [property('page-body', 'body', 'page', 'template')],
	propertyTypes: [
		propertyType('text', 'primitive'),
		propertyType('aggregate', 'record'),
		propertyType('none', 'constant', { of: 'text', value: 'none' }),
	],
	domains: [
		domain('page-property-type-primitive'),
		domain('page-property-type-record'),
		domain('page-property-type-constant'),
		domain('something-else'),
	],
});

describe('assemblePageTree, the page type tree', () => {
	test('nests each type under the one it extends, to whatever depth the nesting goes', () => {
		const tree = assemblePageTree(WHOLE, REPO);
		expect(tree.repo).toBe(REPO);
		expect(tree.roots[0]?.label).toBe('page');
		const domainNode = tree.roots[0]?.children.find((one) => one.label === 'domain');
		expect(domainNode?.id).toBe('type/domain');
		expect(domainNode?.children.map((one) => one.label)).toEqual(['page-property-type']);
	});

	test('`extends-slug: none` is what makes a root, and nothing else is one', () => {
		const tree = assemblePageTree(answers({ types: WHOLE.types }), REPO);
		expect(tree.roots.map((one) => one.label)).toEqual(['page', 'page property types']);
	});

	test('a property draws its key and its type, and opens the document defining it', () => {
		const leaf = assemblePageTree(WHOLE, REPO).roots[0]?.children[0]?.children[0];
		expect(leaf?.id).toBe('type/page/properties/page-body');
		expect(leaf?.label).toBe('body');
		expect(leaf?.detail).toBe('template');
		expect(leaf?.at).toBe(at('pages/page-property-definition/page-body.md'));
	});

	test('the `properties` row stands before the subtypes, and opens nothing itself', () => {
		const root = assemblePageTree(WHOLE, REPO).roots[0] as PageNode;
		expect(root.children.map((one) => one.label)).toEqual(['properties', 'domain']);
		expect(root.children[0]?.at).toBeNull();
		expect(root.children[0]?.detail).toBeNull();
	});

	test('a type defining no property grows no empty `properties` row', () => {
		const tree = assemblePageTree(answers({ types: [type('page', 'none')] }), REPO);
		expect(tree.roots[0]?.children).toHaveLength(0);
	});

	/**
	 * The instructions repository's own composer ordered with `localeCompare`, and this has to agree
	 * with it or the panel reorders itself the day the read moves over. The two disagree exactly on
	 * case, so the assertion is written on a pair that separates them.
	 */
	test('properties order by key the way `localeCompare` orders, not by code point', () => {
		const given = answers({
			types: [type('page', 'none')],
			properties: [property('a-d', 'D', 'page', null), property('a-capture', 'capture', 'page', null)],
		});
		expect(assemblePageTree(given, REPO).roots[0]?.children[0]?.children.map((one) => one.label))
			.toEqual(['capture', 'D']);
	});

	test('subtypes order by slug, so the tree draws the same way twice running', () => {
		const given = answers({ types: [type('page', 'none'), type('zebra', 'page'), type('apple', 'page')] });
		expect(assemblePageTree(given, REPO).roots[0]?.children.map((one) => one.label)).toEqual(['apple', 'zebra']);
	});
});

describe('assemblePageTree, the property type vocabulary', () => {
	test('stands as the second root and opens the page type whose pages it holds', () => {
		const vocabulary = assemblePageTree(WHOLE, REPO).roots[1] as PageNode;
		expect(vocabulary.id).toBe('vocabulary');
		expect(vocabulary.label).toBe('page property types');
		expect(vocabulary.at).toBe(at('pages/page-type/page-property-type.md'));
	});

	test('groups the property types by kind, settled kinds first and the rest alphabetically', () => {
		const given = answers({
			...WHOLE,
			propertyTypes: [...WHOLE.propertyTypes, propertyType('odd', 'zebra'), propertyType('other', 'apple')],
		});
		const vocabulary = assemblePageTree(given, REPO).roots[1] as PageNode;
		expect(vocabulary.children.map((one) => one.label))
			.toEqual(['primitive', 'record', 'constant', 'apple', 'zebra']);
	});

	test('a kind opens the domain naming it, found by the slug that domain carries', () => {
		const vocabulary = assemblePageTree(WHOLE, REPO).roots[1] as PageNode;
		expect(vocabulary.children[0]?.at).toBe(at('pages/domain/page-property-type-primitive.md'));
	});

	test('a kind with no domain naming it draws, and opens nothing, rather than being left out', () => {
		const given = answers({ ...WHOLE, domains: [] });
		const vocabulary = assemblePageTree(given, REPO).roots[1] as PageNode;
		expect(vocabulary.children.map((one) => one.label)).toEqual(['primitive', 'record', 'constant']);
		expect(vocabulary.children[0]?.at).toBeNull();
	});

	/**
	 * `domain-all` answers every domain because the query language has no prefix test, so the filter
	 * that keeps only the kind documents stands here. A domain that is not one of them must not be
	 * read as a kind whose name happens to be its whole slug.
	 */
	test('a domain that is not a kind document is passed over rather than read as a kind', () => {
		const vocabulary = assemblePageTree(WHOLE, REPO).roots[1] as PageNode;
		expect(vocabulary.children.map((one) => one.label)).not.toContain('something-else');
	});

	test('a constant draws what it is of and the value it holds', () => {
		const vocabulary = assemblePageTree(WHOLE, REPO).roots[1] as PageNode;
		const constant = vocabulary.children.find((one) => one.label === 'constant');
		expect(constant?.children[0]?.detail).toBe('text = none');
	});

	test('a type with a suffix draws the suffix, and one with neither draws what it is of', () => {
		const given = answers({
			...WHOLE,
			propertyTypes: [
				propertyType('date', 'primitive', { suffix: '-date' }),
				propertyType('list', 'record', { of: 'text' }),
			],
		});
		const vocabulary = assemblePageTree(given, REPO).roots[1] as PageNode;
		expect(vocabulary.children[0]?.children[0]?.detail).toBe('-date');
		expect(vocabulary.children[1]?.children[0]?.detail).toBe('text');
	});

	test('a property type and a page type of one name are two rows, not one', () => {
		const given = answers({
			types: [type('page', 'none'), type('domain', 'page')],
			propertyTypes: [propertyType('domain', 'primitive')],
		});
		const tree = assemblePageTree(given, REPO);
		expect(tree.roots[0]?.children[0]?.id).toBe('type/domain');
		expect((tree.roots[1] as PageNode).children[0]?.children[0]?.id).toBe('ptype/domain');
	});

	test('a property defined on a property type hangs under the vocabulary, not under a page type', () => {
		const given = answers({ ...WHOLE, properties: [property('aggregate-over', 'over', 'aggregate', 'text')] });
		const vocabulary = assemblePageTree(given, REPO).roots[1] as PageNode;
		const aggregate = vocabulary.children.find((one) => one.label === 'record')?.children[0];
		expect(aggregate?.children[0]?.children[0]?.id).toBe('ptype/aggregate/properties/aggregate-over');
	});
});

describe('assemblePageTree, what it reports rather than draws', () => {
	/**
	 * A type whose parent no query answered with is exactly what the six-query read produces if a
	 * page type is a page of some type nothing asks for. It has to fall to `unreached` rather than be
	 * drawn as a second root: a type that extends something is not a root, and drawing it as one
	 * would hide the fault instead of stating it.
	 */
	test('a type whose parent is absent is reported unreached, never drawn as a second root', () => {
		const given = answers({ types: [type('page', 'none'), type('orphan', 'missing-parent')] });
		const tree = assemblePageTree(given, REPO);
		expect(tree.roots.map((one) => one.id)).toEqual(['type/page', 'vocabulary']);
		expect(tree.unreached).toContain('orphan');
	});

	test('a property defined on a slug nothing draws is reported unreached rather than dropped', () => {
		const given = answers({ ...WHOLE, properties: [property('x-y', 'y', 'nowhere', null)] });
		expect(assemblePageTree(given, REPO).unreached).toContain('nowhere');
	});

	test('a property defined on a property type is drawn, so it is not reported unreached', () => {
		const given = answers({ ...WHOLE, properties: [property('aggregate-over', 'over', 'aggregate', null)] });
		expect(assemblePageTree(given, REPO).unreached).toEqual([]);
	});

	test('the unreached list is sorted, so two reads of one set of pages report it the same way', () => {
		const given = answers({ types: [type('page', 'none'), type('b', 'gone'), type('a', 'gone')] });
		expect(assemblePageTree(given, REPO).unreached).toEqual(['a', 'b']);
	});

	test('pages that all reach a root report nothing unreached', () => {
		expect(assemblePageTree(WHOLE, REPO).unreached).toEqual([]);
	});

	/**
	 * Two types extending each other would recurse until the stack ended. This is the guard, and it is
	 * worth a test because the pages that trigger it are ones nobody writes on purpose.
	 */
	test('types extending each other are drawn once rather than recursed forever', () => {
		const given = answers({ types: [type('page', 'none'), type('a', 'b'), type('b', 'a')] });
		const tree = assemblePageTree(given, REPO);
		expect(tree.roots[0]?.children).toHaveLength(0);
		expect(tree.unreached).toEqual(['a', 'b']);
	});

	/**
	 * The one promise that is about the answer as a whole rather than about a row, and the one whose
	 * breach is silent: the workbench keys expansion off `TreeItem.id`, so a repeated id draws two
	 * rows that open and close together rather than throwing anywhere.
	 */
	test('two properties of one type answering with one slug are refused and the id is named', () => {
		const given = answers({
			types: [type('page', 'none')],
			properties: [property('same', 'a', 'page', null), property('same', 'b', 'page', null)],
		});
		expect(() => assemblePageTree(given, REPO)).toThrow(/more than one row/);
		expect(() => assemblePageTree(given, REPO)).toThrow(/type\/page\/properties\/same/);
	});

	/**
	 * A page type and its property definitions live where their domain lives, so one answer carries
	 * rows from more than one repository. A row cut down to a bare path would open under whichever
	 * repository the panel happened to be watching, which is a click that fails after Alan made it.
	 */
	test('a row from another repository keeps that repository on it rather than being refused', () => {
		const foreign = answers({
			types: [
				{ at: 'code-editor:readouts/readout.page-type.md', values: { slug: 'readout', 'extends-slug': 'none' } },
			],
		});
		expect(assemblePageTree(foreign, REPO).roots[0]?.at).toBe('code-editor:readouts/readout.page-type.md');
	});

	test('a row whose `at` carries no repository is refused rather than read as a bare path', () => {
		const bare = answers({
			types: [{ at: 'pages/page-type/page.md', values: { slug: 'page', 'extends-slug': 'none' } }],
		});
		expect(() => assemblePageTree(bare, REPO)).toThrow(/cannot place/);
	});

	test('a row carrying no slug is passed over rather than drawn under an empty id', () => {
		const given = answers({
			types: [type('page', 'none'), { at: at('pages/page-type/x.md'), values: { 'extends-slug': 'page' } }],
		});
		expect(assemblePageTree(given, REPO).roots[0]?.children).toHaveLength(0);
	});

	test('a property type row carrying no kind is passed over rather than grouped under nothing', () => {
		const given = answers({
			propertyTypes: [{ at: at('pages/page-property-type/x.md'), values: { 'type-slug': 'x' } }],
		});
		expect((assemblePageTree(given, REPO).roots[0] as PageNode).children).toHaveLength(0);
	});
});
