/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Rows from the page query service, nested into the two trees the panel draws.
 *
 * WHY THE NESTING IS DONE HERE RATHER THAN ASKED FOR. `pages/domain/page-query-language.domain.md` says a
 * page query "tests one page at a time". A tree is a relation between pages, so no query can answer
 * one — a designed limit rather than a gap, and it puts shaping on whoever shapes. The relation is
 * already in the rows: a page type carries `extends-slug`, a property definition carries
 * `defined-on-slug`. Nesting is a rendering of that, and rendering is this file's job.
 *
 * WHY SIX QUERIES AND NOT TWO. A page type is anything whose OWN page type reaches `page-type` along
 * `extends-slug` — not only a page of `page-type` itself. `category-rule` and `email-rule` are pages
 * of `rules-engine-rule-set`, and three property definitions are pages of
 * `alan-harness-tracking-field`. A query names one page type and does not expand into its subtypes,
 * so each of those needs a query of its own. THAT SET IS DECIDED BY THE PAGES RATHER THAN BY THIS
 * FILE: land a new page type that is a page of some third type and its rows stop arriving here,
 * silently, until a query page is written for it.
 *
 * SEPARATE FROM `harness.ts`, WHICH DOES THE ASKING. Everything about the shape of the tree is
 * decided here and nothing about where the rows came from, so this can be held to a fixture.
 */

/** One row as a page query answers it. Structural, so the schema in `harness.ts` satisfies it. */
export interface QueryRow {
	readonly at: string;
	readonly values: Readonly<Record<string, string | readonly string[] | null>>;
}

/** One row and everything beneath it. */
export interface PageNode {
	/**
	 * This row's key in the view, unique across the whole answer. Namespaced here now, where the
	 * command used to do it: a page type and a property type can share a slug — `domain` is both —
	 * and two rows sharing a `TreeItem.id` are one row to the workbench, so expanding either expands
	 * both. `assemblePageTree` holds itself to that rather than assuming it.
	 */
	readonly id: string;
	/** What the row draws. */
	readonly label: string;
	/**
	 * The document this row opens as the query named it — `<repo>:<path inside it>` — or null where
	 * the row is scaffolding and opens nothing.
	 */
	readonly at: string | null;
	/** Shown beside the label. */
	readonly detail: string | null;
	readonly children: readonly PageNode[];
}

export interface PageTree {
	/** The repository this tree was read for, and the one watched for changes to it. */
	readonly repo: string;
	readonly roots: readonly PageNode[];
	/**
	 * Slugs no root reaches. Empty where every page type reaches a root and every property is
	 * defined on something drawn; carried so a fault can be said out loud rather than shown as
	 * absence.
	 */
	readonly unreached: readonly string[];
}

/** What the six queries answered, already merged into the four things this reads. */
export interface PageAnswers {
	/** `page-type-all` and `rules-engine-rule-set-all`. */
	readonly types: readonly QueryRow[];
	/** `page-property-definition-all` and `alan-harness-tracking-field-all`. */
	readonly properties: readonly QueryRow[];
	/** `page-property-type-all`. */
	readonly propertyTypes: readonly QueryRow[];
	/** `domain-all`, for the documents naming each kind. */
	readonly domains: readonly QueryRow[];
}

/** A page type declaring this extends nothing, which is how a page type spells being a root. */
const NO_PARENT = 'none';

/** The page type whose pages are the property type vocabulary, and the row that opens its document. */
const VOCABULARY_TYPE = 'page-property-type';
const VOCABULARY_ID = 'vocabulary';
const VOCABULARY_LABEL = 'page property types';

/**
 * The domains naming a property type kind, told apart by their slug.
 *
 * THE SAME PREFIX THE COMPOSER USED, and the reason `domain-all` is asked rather than something
 * narrower: the predicate vocabulary has no prefix test, so the choice is between this filter and a
 * query page enumerating the kinds. Enumerating would put the kind names in a second place — they
 * already stand in `KIND_ORDER` below, which the ordering needs — so the filter is here and the
 * query asks for all of them.
 */
const KIND_DOMAIN = 'page-property-type-';

/**
 * The kinds that have a settled place, in it; anything else follows them alphabetically.
 *
 * HELD HERE BECAUSE THE ORDER IS NOT IN THE PAGES. `tools/lib/page-tree.ts` carries the same list for
 * the same reason, and this has to agree with it or the two draw the vocabulary differently.
 */
const KIND_ORDER: readonly string[] = ['primitive', 'composite', 'record', 'select', 'constant'];

/** One page type as the tree needs it. */
interface TypeRow {
	readonly slug: string;
	readonly at: string;
	/** `null` where this type extends nothing, which is what makes it a root. */
	readonly extendsSlug: string | null;
}

/** One property definition as the tree needs it. */
interface PropertyRow {
	readonly slug: string;
	readonly at: string;
	readonly key: string;
	readonly type: string | null;
}

/** One property type as the tree needs it. */
interface PropertyTypeRow {
	readonly typeSlug: string;
	readonly at: string;
	readonly kind: string;
	readonly suffix: string | null;
	readonly of: string | null;
	readonly value: string | null;
}

/** The text a row's `values` carries under a key, or null where it carries none. */
function textOf(row: QueryRow, key: string): string | null {
	const held = row.values[key];
	return typeof held === 'string' ? held : null;
}

/**
 * Where a row says its document is, carried whole rather than cut down to a path.
 *
 * KEPT WITH ITS REPOSITORY ON IT because pages no longer stand in one. A page type or a property
 * definition lives where its domain lives, so one answer carries rows from instructions and rows
 * from akasha alike, and a path stripped of which one it came from cannot be opened. `documentPath`
 * in `harness.ts` is what turns this back into a file.
 *
 * A row naming no repository is still refused: it names a file nothing can find.
 */
function atOf(row: QueryRow): string {
	const cut = row.at.indexOf(':');
	const repo = cut === -1 ? '' : row.at.slice(0, cut);
	const rel = cut === -1 ? '' : row.at.slice(cut + 1);
	if (repo === '' || rel === '') {
		throw new Error(
			`a page query answered with a row this cannot place: \`${row.at}\` names ` +
			'no repository and a path inside it'
		);
	}
	return row.at;
}

/**
 * How every list here is ordered.
 *
 * `localeCompare` RATHER THAN `<`, matching what the instructions repository's own composer used.
 * The two disagree on case — `capture` sorts before `D` under one and after it under the other — so
 * the choice is visible in the panel rather than academic.
 */
function byText(a: string, b: string): number {
	return a.localeCompare(b);
}

/** The `properties` row beneath a type, or null where that type defines none. */
function propertiesNode(id: string, rows: readonly PropertyRow[]): PageNode | null {
	if (rows.length === 0) { return null; }
	const children = [...rows]
		.sort((a, b) => byText(a.key, b.key) || byText(a.slug, b.slug))
		.map((row) => ({
			id: `${id}/${row.slug}`,
			label: row.key,
			at: row.at,
			detail: row.type,
			children: [],
		}));
	return { id, label: 'properties', at: null, detail: null, children };
}

/** What a property type draws beside its name: a constant's value, else its suffix, else what it is of. */
function detailOfType(row: PropertyTypeRow): string | null {
	if (row.kind === 'constant' && row.of !== null && row.value !== null) { return `${row.of} = ${row.value}`; }
	if (row.suffix !== null) { return row.suffix; }
	return row.of;
}

/** The kinds standing in these rows, the settled ones first and the rest alphabetically. */
function kindsIn(rows: readonly PropertyTypeRow[]): readonly string[] {
	const standing = [...new Set(rows.map((row) => row.kind))];
	return [
		...KIND_ORDER.filter((kind) => standing.includes(kind)),
		...standing.filter((kind) => !KIND_ORDER.includes(kind)).sort(byText),
	];
}

/** Every row's id, in the order the rows stand, so a repeat can be named rather than counted. */
function allIds(nodes: readonly PageNode[]): readonly string[] {
	return nodes.flatMap((node) => [node.id, ...allIds(node.children)]);
}

/** The six answers, nested into the page type tree and the property type vocabulary beside it. */
export function assemblePageTree(answers: PageAnswers, repo: string): PageTree {
	const types = new Map<string, TypeRow>();
	for (const row of answers.types) {
		const slug = textOf(row, 'slug');
		if (slug === null) { continue; }
		const named = textOf(row, 'extends-slug');
		types.set(slug, {
			slug,
			at: atOf(row),
			extendsSlug: named === null || named === NO_PARENT ? null : named,
		});
	}

	const definedOn = new Map<string, PropertyRow[]>();
	for (const row of answers.properties) {
		const slug = textOf(row, 'slug');
		const key = textOf(row, 'key');
		const on = textOf(row, 'defined-on-slug');
		if (slug === null || key === null || on === null) { continue; }
		const held = definedOn.get(on) ?? [];
		held.push({ slug, at: atOf(row), key, type: textOf(row, 'type') });
		definedOn.set(on, held);
	}

	const propertyTypes: PropertyTypeRow[] = [];
	for (const row of answers.propertyTypes) {
		const typeSlug = textOf(row, 'type-slug');
		const kind = textOf(row, 'kind');
		if (typeSlug === null || kind === null) { continue; }
		propertyTypes.push({
			typeSlug,
			at: atOf(row),
			kind,
			suffix: textOf(row, 'suffix'),
			of: textOf(row, 'of'),
			value: textOf(row, 'value'),
		});
	}

	const kindAt = new Map<string, string>();
	for (const row of answers.domains) {
		const slug = textOf(row, 'slug');
		if (slug === null || !slug.startsWith(KIND_DOMAIN)) { continue; }
		kindAt.set(slug.slice(KIND_DOMAIN.length), atOf(row));
	}

	// Sorted before grouping, so each parent's children come out in order without sorting again.
	const children = new Map<string, string[]>();
	const rootSlugs: string[] = [];
	for (const row of [...types.values()].sort((a, b) => byText(a.slug, b.slug))) {
		const parent = row.extendsSlug;
		if (parent === null) { rootSlugs.push(row.slug); continue; }
		// A type extending itself, or extending something no query answered with, is neither a root
		// nor a child. It falls to `unreached` below rather than being drawn as a second root: a type
		// that extends something is not a root, and drawing it as one would hide the fault.
		if (parent === row.slug || !types.has(parent)) { continue; }
		children.set(parent, [...(children.get(parent) ?? []), row.slug]);
	}

	// `seen` is the cycle guard as much as the record: two page types extending each other would
	// otherwise recurse until the stack ended.
	const seen = new Set<string>();
	const build = (slug: string): PageNode => {
		seen.add(slug);
		const row = types.get(slug) as TypeRow;
		const props = propertiesNode(`type/${slug}/properties`, definedOn.get(slug) ?? []);
		const kids = (children.get(slug) ?? []).filter((one) => !seen.has(one)).map(build);
		return {
			id: `type/${slug}`,
			label: slug,
			at: row.at,
			detail: null,
			children: props === null ? kids : [props, ...kids],
		};
	};
	const typeRoots = rootSlugs.map(build);

	const vocabulary: PageNode = {
		id: VOCABULARY_ID,
		label: VOCABULARY_LABEL,
		at: types.get(VOCABULARY_TYPE)?.at ?? null,
		detail: null,
		children: kindsIn(propertyTypes).map((kind) => ({
			id: `kind/${kind}`,
			label: kind,
			at: kindAt.get(kind) ?? null,
			detail: null,
			children: propertyTypes
				.filter((row) => row.kind === kind)
				.sort((a, b) => byText(a.typeSlug, b.typeSlug))
				.map((row) => {
					const props = propertiesNode(
						`ptype/${row.typeSlug}/properties`,
						definedOn.get(row.typeSlug) ?? []
					);
					return {
						id: `ptype/${row.typeSlug}`,
						label: row.typeSlug,
						at: row.at,
						detail: detailOfType(row),
						children: props === null ? [] : [props],
					};
				}),
		})),
	};

	// A property defined on a property type is drawn under the vocabulary rather than under a page
	// type, so `drawn` is wider than `seen` and only the difference is a fault worth reporting.
	const drawn = new Set([...seen, ...propertyTypes.map((row) => row.typeSlug)]);
	const unreached = [
		...new Set([
			...[...types.keys()].filter((slug) => !seen.has(slug)),
			...[...definedOn.keys()].filter((slug) => !drawn.has(slug)),
		]),
	].sort(byText);

	const roots = [...typeRoots, vocabulary];

	// UNIQUENESS IS PART OF THE SHAPE, AND A SCHEMA CANNOT SEE IT. Every id above is composed from a
	// slug, so two pages answering with one slug put two rows under one key. That is silent: the
	// workbench keys expansion off `TreeItem.id`, so it neither throws nor draws wrong — it makes two
	// rows behave as one, and the reader meets a branch that opens another elsewhere on the tree.
	const ids = allIds(roots);
	const repeated = [...new Set(ids.filter((id, at) => ids.indexOf(id) !== at))];
	if (repeated.length > 0) {
		throw new Error(
			`the page queries answered a shape this cannot read: ` +
			`${repeated.length} id(s) appear on more than one row: ${repeated.join(', ')}`
		);
	}

	return { repo, roots, unreached };
}
