import { slugsIn } from "@akasha/pages-system/page-value"

export interface QueryRow {
  readonly at: string
  readonly values: Readonly<Record<string, string | readonly string[] | null>>
}

export interface PageNode {
  readonly id: string
  readonly label: string
  readonly at: string | null
  readonly detail: string | null
  readonly children: readonly PageNode[]
}

export interface PageTree {
  readonly repo: string
  readonly roots: readonly PageNode[]
  readonly unreached: readonly string[]
}

export interface PageAnswers {
  readonly types: readonly QueryRow[]
  readonly properties: readonly QueryRow[]
  readonly propertyTypes: readonly QueryRow[]
}

const NO_PARENT = "none"

const TYPE_ID = "type"

const ON_TYPE = "page-type"

const ON_PROPERTY_TYPE = "page-property-type"

const VOCABULARY_ROOT_TYPE = "page-property"
const VOCABULARY_ID = "vocabulary"
const VOCABULARY_LABEL = "page property types"

interface TypeRow {
  readonly slug: string
  readonly at: string
  readonly extendsSlugs: readonly string[]
}

interface PropertyRow {
  readonly slug: string
  readonly at: string
  readonly key: string
  readonly type: string | null
}

interface PropertyTypeRow {
  readonly typeSlug: string
  readonly at: string
  readonly kind: string
  readonly suffix: string | null
  readonly of: string | null
  readonly value: string | null
}

function textOf(row: QueryRow, key: string): string | null {
  const held = row.values[key]
  return typeof held === "string" ? held : null
}

function atOf(row: QueryRow): string {
  const cut = row.at.indexOf(":")
  const repo = cut === -1 ? "" : row.at.slice(0, cut)
  const rel = cut === -1 ? "" : row.at.slice(cut + 1)
  if (repo === "" || rel === "") {
    throw new Error(
      `a page query answered with a row this cannot place: \`${row.at}\` names ` +
        "no repository and a path inside it"
    )
  }
  return row.at
}

function byText(a: string, b: string): number {
  return a.localeCompare(b)
}

function propertiesNode(id: string, rows: readonly PropertyRow[]): PageNode | null {
  if (rows.length === 0) {
    return null
  }
  const children = [...rows]
    .sort((a, b) => byText(a.key, b.key) || byText(a.slug, b.slug))
    .map((row) => ({
      id: `${id}/${row.slug}`,
      label: row.key,
      at: row.at,
      detail: row.type,
      children: [],
    }))
  return { id, label: "properties", at: null, detail: null, children }
}

function detailOfType(row: PropertyTypeRow): string | null {
  if (row.kind === "constant" && row.of !== null && row.value !== null) {
    return `${row.of} = ${row.value}`
  }
  if (row.suffix !== null) {
    return row.suffix
  }
  return row.of
}

function kindsIn(rows: readonly PropertyTypeRow[]): readonly string[] {
  return [...new Set(rows.map((row) => row.kind))].sort(byText)
}

function allIds(nodes: readonly PageNode[]): readonly string[] {
  return nodes.flatMap((node) => [node.id, ...allIds(node.children)])
}

function repeatedIn(ids: readonly string[]): readonly string[] {
  const seen = new Set<string>()
  const twice = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) {
      twice.add(id)
    }
    seen.add(id)
  }
  return [...twice]
}

export function assemblePageTree(answers: PageAnswers, repo: string): PageTree {
  const types = new Map<string, TypeRow>()
  for (const row of answers.types) {
    const slug = textOf(row, "slug")
    if (slug === null) {
      continue
    }
    const at = atOf(row)
    const held = types.get(slug)
    const above = held?.extendsSlugs ?? []
    const named = slugsIn(row.values["extends-slug"]).filter(
      (one) => one !== NO_PARENT && !above.includes(one)
    )
    types.set(slug, { slug, at: held?.at ?? at, extendsSlugs: [...above, ...named] })
  }

  const definedOn = new Map<string, PropertyRow[]>()
  for (const row of answers.properties) {
    const slug = textOf(row, "slug")
    const key = textOf(row, "key")
    const on = textOf(row, "defined-on-slug")
    if (slug === null || key === null || on === null) {
      continue
    }
    const held = definedOn.get(on) ?? []
    held.push({ slug, at: atOf(row), key, type: textOf(row, "type") })
    definedOn.set(on, held)
  }

  const propertyTypes: PropertyTypeRow[] = []
  for (const row of answers.propertyTypes) {
    const typeSlug = textOf(row, "type-slug")
    const kind = textOf(row, "kind")
    if (typeSlug === null || kind === null) {
      continue
    }
    propertyTypes.push({
      typeSlug,
      at: atOf(row),
      kind,
      suffix: textOf(row, "suffix"),
      of: textOf(row, "of"),
      value: textOf(row, "value"),
    })
  }

  const children = new Map<string, string[]>()
  const firstAbove = new Map<string, string>()
  const rootSlugs: string[] = []
  for (const row of [...types.values()].sort((a, b) => byText(a.slug, b.slug))) {
    if (row.extendsSlugs.length === 0) {
      rootSlugs.push(row.slug)
      continue
    }
    const above = row.extendsSlugs.filter((one) => one !== row.slug && types.has(one))
    const [first] = above
    if (first !== undefined) {
      firstAbove.set(row.slug, first)
    }
    for (const parent of above) {
      children.set(parent, [...(children.get(parent) ?? []), row.slug])
    }
  }

  const reached = new Set<string>()
  const build = (slug: string, id: string, own: boolean, opened: readonly string[]): PageNode => {
    reached.add(slug)
    const row = types.get(slug) as TypeRow
    const props = propertiesNode(`${id}/properties`, definedOn.get(`${ON_TYPE}/${slug}`) ?? [])
    const under = [...opened, slug]
    const kids = (children.get(slug) ?? [])
      .filter((one) => !under.includes(one))
      .map((one) => {
        const bare = own && firstAbove.get(one) === slug
        return build(one, bare ? `${TYPE_ID}/${one}` : `${id}/${one}`, bare, under)
      })
    return {
      id,
      label: slug,
      at: row.at,
      detail: null,
      children: props === null ? kids : [props, ...kids],
    }
  }
  const typeRoots = rootSlugs.map((slug) => build(slug, `${TYPE_ID}/${slug}`, true, []))

  const vocabulary: PageNode = {
    id: VOCABULARY_ID,
    label: VOCABULARY_LABEL,
    at: types.get(VOCABULARY_ROOT_TYPE)?.at ?? null,
    detail: null,
    children: kindsIn(propertyTypes).map((kind) => ({
      id: `kind/${kind}`,
      label: kind,
      at: types.get(kind)?.at ?? null,
      detail: null,
      children: propertyTypes
        .filter((row) => row.kind === kind)
        .sort((a, b) => byText(a.typeSlug, b.typeSlug))
        .map((row) => {
          const props = propertiesNode(
            `ptype/${row.typeSlug}/properties`,
            definedOn.get(`${ON_PROPERTY_TYPE}/${row.typeSlug}`) ?? []
          )
          return {
            id: `ptype/${row.typeSlug}`,
            label: row.typeSlug,
            at: row.at,
            detail: detailOfType(row),
            children: props === null ? [] : [props],
          }
        }),
    })),
  }

  const drawn = new Set([
    ...[...reached].map((slug) => `${ON_TYPE}/${slug}`),
    ...propertyTypes.map((row) => `${ON_PROPERTY_TYPE}/${row.typeSlug}`),
  ])
  const unreached = [
    ...new Set([
      ...[...types.keys()].filter((slug) => !reached.has(slug)).map((slug) => `${ON_TYPE}/${slug}`),
      ...[...definedOn.keys()].filter((slug) => !drawn.has(slug)),
    ]),
  ].sort(byText)

  const roots = [...typeRoots, vocabulary]

  const repeated = repeatedIn(allIds(roots))
  if (repeated.length > 0) {
    throw new Error(
      `the page queries answered a shape this cannot read: ` +
        `${repeated.length} id(s) appear on more than one row: ${repeated.join(", ")}`
    )
  }

  return { repo, roots, unreached }
}
