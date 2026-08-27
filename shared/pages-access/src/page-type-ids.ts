import { askComposed, type ComposedQuery } from "@shared/pages-query/ask"
import { type Asked } from "../../pages-query/src/index"

export type GetPageTypeIdsBySlugsArgs = { readonly slugs: ReadonlyArray<string> }

export type PageTypeIdDeps = {
  readonly ask: (query: ComposedQuery) => Promise<Asked>
}

const PAGE_TYPE = "page-type"

export class PageTypesUnread extends Error {
  readonly why: string
  constructor(why: string) {
    super(`the page types went unread, so no id can be called present or missing: ${why}`)
    this.name = "PageTypesUnread"
    this.why = why
  }
}

export class PageTypesMissing extends Error {
  readonly slugs: readonly string[]
  constructor(slugs: readonly string[]) {
    super(`no page-type file for slug(s): ${slugs.join(", ")}`)
    this.name = "PageTypesMissing"
    this.slugs = slugs
  }
}

function textOf(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const value = values[key]
  return typeof value === "string" && value !== "" ? value : null
}

export async function getPageTypeIdsBySlugs(
  { slugs }: GetPageTypeIdsBySlugsArgs,
  deps?: PageTypeIdDeps
): Promise<Map<string, string>> {
  if (slugs.length === 0) return new Map()
  const wanted = [...new Set(slugs)]
  const query: ComposedQuery = {
    "page-type": PAGE_TYPE,
    keys: ["slug", "id"],
    where: { slug: { in: wanted } },
    limit: wanted.length,
  }
  const asked = deps === undefined ? await askComposed(query) : await deps.ask(query)
  if (!asked.ok) throw new PageTypesUnread(asked.why)
  const out = new Map<string, string>()
  for (const row of asked.answer.rows) {
    const slug = textOf(row.values, "slug")
    const id = textOf(row.values, "id")
    if (slug !== null && id !== null) out.set(slug, id)
  }
  const missing = wanted.filter((one) => !out.has(one))
  if (missing.length > 0) throw new PageTypesMissing(missing)
  return out
}

export async function getPageTypeIdBySlug(slug: string, deps?: PageTypeIdDeps): Promise<string> {
  const map = await getPageTypeIdsBySlugs({ slugs: [slug] }, deps)
  const id = map.get(slug)
  if (id === undefined) throw new PageTypesMissing([slug])
  return id
}
