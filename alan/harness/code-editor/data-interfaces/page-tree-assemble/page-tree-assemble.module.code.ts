import { slugOf } from "akasha/pages/value/page-value.module.code.ts"

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

interface TypeRow {
  readonly slug: string
  readonly at: string
  readonly extendsSlugs: readonly string[]
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
    const said = textOf(row, "extends-slug")
    const parent = said === null || said === NO_PARENT ? null : slugOf(said)
    const named = parent === null || above.includes(parent) ? [] : [parent]
    types.set(slug, { slug, at: held?.at ?? at, extendsSlugs: [...above, ...named] })
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
      children: kids,
    }
  }
  const roots = rootSlugs.map((slug) => build(slug, `${TYPE_ID}/${slug}`, true, []))

  const unreached = [...types.keys()]
    .filter((slug) => !reached.has(slug))
    .map((slug) => `${ON_TYPE}/${slug}`)
    .sort(byText)

  const repeated = repeatedIn(allIds(roots))
  if (repeated.length > 0) {
    throw new Error(
      `the page queries answered a shape this cannot read: ` +
        `${repeated.length} id(s) appear on more than one row: ${repeated.join(", ")}`
    )
  }

  return { repo, roots, unreached }
}
