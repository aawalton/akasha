export interface QueryRow {
	readonly at: string;
	readonly values: Readonly<Record<string, string | readonly string[] | null>>;
}

export interface PageNode {
	readonly id: string;
	readonly label: string;
	readonly at: string | null;
	readonly detail: string | null;
	readonly children: readonly PageNode[];
}

export interface PageTree {
	readonly repo: string;
	readonly roots: readonly PageNode[];
	readonly unreached: readonly string[];
}

export interface PageAnswers {
	readonly types: readonly QueryRow[];
	readonly properties: readonly QueryRow[];
	readonly propertyTypes: readonly QueryRow[];
	readonly domains: readonly QueryRow[];
}

const NO_PARENT = 'none';

const VOCABULARY_TYPE = 'page-property-type';
const VOCABULARY_ID = 'vocabulary';
const VOCABULARY_LABEL = 'page property types';

const KIND_DOMAIN = 'page-property-type-';

const KIND_ORDER: readonly string[] = ['primitive', 'composite', 'record', 'select', 'constant'];

interface TypeRow {
	readonly slug: string;
	readonly at: string;
	readonly extendsSlug: string | null;
}

interface PropertyRow {
	readonly slug: string;
	readonly at: string;
	readonly key: string;
	readonly type: string | null;
}

interface PropertyTypeRow {
	readonly typeSlug: string;
	readonly at: string;
	readonly kind: string;
	readonly suffix: string | null;
	readonly of: string | null;
	readonly value: string | null;
}

function textOf(row: QueryRow, key: string): string | null {
	const held = row.values[key];
	return typeof held === 'string' ? held : null;
}

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

function byText(a: string, b: string): number {
	return a.localeCompare(b);
}

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

function detailOfType(row: PropertyTypeRow): string | null {
	if (row.kind === 'constant' && row.of !== null && row.value !== null) { return `${row.of} = ${row.value}`; }
	if (row.suffix !== null) { return row.suffix; }
	return row.of;
}

function kindsIn(rows: readonly PropertyTypeRow[]): readonly string[] {
	const standing = [...new Set(rows.map((row) => row.kind))];
	return [
		...KIND_ORDER.filter((kind) => standing.includes(kind)),
		...standing.filter((kind) => !KIND_ORDER.includes(kind)).sort(byText),
	];
}

function allIds(nodes: readonly PageNode[]): readonly string[] {
	return nodes.flatMap((node) => [node.id, ...allIds(node.children)]);
}

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

	const children = new Map<string, string[]>();
	const rootSlugs: string[] = [];
	for (const row of [...types.values()].sort((a, b) => byText(a.slug, b.slug))) {
		const parent = row.extendsSlug;
		if (parent === null) { rootSlugs.push(row.slug); continue; }
		if (parent === row.slug || !types.has(parent)) { continue; }
		children.set(parent, [...(children.get(parent) ?? []), row.slug]);
	}

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

	const drawn = new Set([...seen, ...propertyTypes.map((row) => row.typeSlug)]);
	const unreached = [
		...new Set([
			...[...types.keys()].filter((slug) => !seen.has(slug)),
			...[...definedOn.keys()].filter((slug) => !drawn.has(slug)),
		]),
	].sort(byText);

	const roots = [...typeRoots, vocabulary];

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
