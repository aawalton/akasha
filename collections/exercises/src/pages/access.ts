import { askComposed, type ComposedQuery } from "@shared/pages-query/ask"
import type { Json, Page } from "./page"

export type PageCondition =
  | { readonly key: string; readonly eq: string | number | boolean }
  | { readonly key: string; readonly in: readonly string[] }
  | { readonly key: string; readonly contains: string }
  | { readonly key: string; readonly isNull: true }

export interface PageOrder {
  readonly by: string
  readonly dir: "asc" | "desc"
}

export interface PageQuery {
  readonly pageTypeSlug: string
  readonly where?: readonly PageCondition[]
  readonly order?: readonly PageOrder[]
  readonly select?: readonly string[]
  readonly limit?: number
}

export function kebabKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

export function camelKey(key: string): string {
  return key.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase())
}

const TEXT_KEYS: ReadonlySet<string> = new Set(["id", "slug", "title"])

function nativeScalar(value: unknown): Json {
  if (typeof value !== "string") return (value ?? null) as Json
  if (value === "true") return true
  if (value === "false") return false
  if (value !== "" && /^-?\d+(\.\d+)?$/.test(value)) return Number(value)
  return value
}

function textOrNull(value: unknown): Json {
  return typeof value === "string" ? value : null
}

export function pageOfRow(values: Readonly<Record<string, unknown>>): Page {
  const held: Record<string, Json> = {}
  for (const [key, value] of Object.entries(values)) {
    const name = camelKey(key)
    held[name] = TEXT_KEYS.has(name) ? textOrNull(value) : nativeScalar(value)
  }
  const id = held.id
  const seq = held.seq
  const title = held.title
  const slug = held.slug
  return {
    ...held,
    id: typeof id === "string" ? id : "",
    seq: typeof seq === "number" ? seq : null,
    title: typeof title === "string" ? title : null,
    slug: typeof slug === "string" ? slug : null,
  }
}

function testFor(condition: PageCondition): Readonly<Record<string, unknown>> {
  if ("eq" in condition) return { is: condition.eq }
  if ("in" in condition) return { in: condition.in }
  if ("contains" in condition) return { contains: condition.contains }
  return { empty: true }
}

export function composedFor(query: PageQuery): ComposedQuery {
  const where: Record<string, unknown> = {}
  for (const condition of query.where ?? []) where[kebabKey(condition.key)] = testFor(condition)
  const first = query.order?.[0]
  return {
    "page-type": query.pageTypeSlug,
    ...(Object.keys(where).length === 0 ? {} : { where }),
    ...(first === undefined
      ? {}
      : { "sort-by": kebabKey(first.by), descending: first.dir === "desc" }),
    ...(query.select === undefined ? {} : { keys: query.select.map(kebabKey) }),
    ...(query.limit === undefined ? {} : { limit: query.limit }),
  }
}

export interface PagesRead {
  readonly rows: readonly Page[]
}

/**
 * Asking this package's queries of *some* store, rather than of the one below.
 *
 * `getPages` binds these queries to `@shared/pages-query/ask` — the remote half, which answers
 * `400: '<page type>' names no page type the index holds` for every page type this package reads.
 * A reader that needs the checkout the pages actually stand in takes one of these instead, states
 * the query whole through the local client, and hands the rows back through `pageOfRow` — this
 * package's own reducer — so what a row means is decided here either way and only where the answer
 * comes from changes.
 */
export type AskPages = (query: PageQuery) => Promise<PagesRead>

export async function getPages(query: PageQuery): Promise<PagesRead> {
  const asked = await askComposed(composedFor(query))
  if (!asked.ok) throw new Error(`\`${query.pageTypeSlug}\` went unread: ${asked.why}`)
  return { rows: asked.answer.rows.map((row) => pageOfRow(row.values)) }
}

export async function getPage(query: PageQuery): Promise<Page | null> {
  const found = await getPages({ ...query, limit: query.limit ?? 1 })
  return found.rows[0] ?? null
}

// THE READING HALF OF THIS FILE WORKS AND THE WRITING HALF DOES NOT. `getPages`, `getPage` and
// `pageOfRow` above ask the store and are asked by `ops exercise today`, `ranks`, `next-set`,
// `history`, `session-show`, `mobility-show`, `equipment-list` and `constraint-list`, all of which
// still answer.
//
// `createPage` and `patchPage` landed through `writePage` and `patchPage`, and the store refuses
// every keyed write, so they have thrown since. What that costs is one-sided and worth naming: a
// workout is read back fine and cannot be recorded. `ops exercise session-start`, `log-set`,
// `log-activity`, `add`, `session-finish`, `schedule-create`, `constraint-set` and `equipment-set`
// all end here, so nothing Alan does in a session is being written down. The reads keep answering
// from what was already filed, which makes the history look whole while it stops advancing.
//
// The `valuesFor` narrowing that stood here served only these two, and went with them. A
// restoration wants a writing road, not a fuller conversion.
const NO_KEYED_WRITE = "the page store refuses every keyed write"

export async function createPage(
  pageTypeSlug: string,
  name: string,
  _properties: Readonly<Record<string, Json>>
): Promise<Page> {
  throw new Error(
    `\`${pageTypeSlug}/${name}\` was not written — ${NO_KEYED_WRITE}, so this exercise page does ` +
      `not stand and the reads over this page type will keep answering as though it was never made`
  )
}

export async function patchPage(
  pageTypeSlug: string,
  name: string,
  values: Readonly<Record<string, Json>>
): Promise<void> {
  throw new Error(
    `\`${pageTypeSlug}/${name}\` was not patched — ${NO_KEYED_WRITE}, so ` +
      `${Object.keys(values).join(", ")} still read as whatever they were before this asked`
  )
}
