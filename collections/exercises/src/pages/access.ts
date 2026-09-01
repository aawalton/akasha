import { patchPage as patchPageThere, type Value, writePage } from "@shared/pages-query"
import { askComposed, type ComposedQuery } from "@shared/pages-query/ask"
import type { Json, Page } from "./page"

export const WRITER = "ops exercise"

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

function composedFor(query: PageQuery): ComposedQuery {
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

export async function getPages(query: PageQuery): Promise<PagesRead> {
  const asked = await askComposed(composedFor(query))
  if (!asked.ok) throw new Error(`\`${query.pageTypeSlug}\` went unread: ${asked.why}`)
  return { rows: asked.answer.rows.map((row) => pageOfRow(row.values)) }
}

export async function getPage(query: PageQuery): Promise<Page | null> {
  const found = await getPages({ ...query, limit: query.limit ?? 1 })
  return found.rows[0] ?? null
}

function valueOf(key: string, held: Json): Value | null {
  if (held === null) return null
  if (typeof held === "string" || typeof held === "number" || typeof held === "boolean") return held
  if (Array.isArray(held)) {
    const out: string[] = []
    for (const one of held) {
      if (typeof one !== "string") {
        throw new Error(`\`${key}\` states a list this writer cannot land: every entry has to be text`)
      }
      out.push(one)
    }
    return out
  }
  throw new Error(`\`${key}\` states a map, and the page query service takes text, numbers, flags and lists of text`)
}

export function valuesFor(
  properties: Readonly<Record<string, Json>>
): Readonly<Record<string, Value>> {
  const out: Record<string, Value> = {}
  for (const [key, held] of Object.entries(properties)) {
    const value = valueOf(key, held)
    if (value !== null) out[kebabKey(key)] = value
  }
  return out
}

export async function createPage(
  pageTypeSlug: string,
  name: string,
  properties: Readonly<Record<string, Json>>
): Promise<Page> {
  const landed = await writePage(pageTypeSlug, name, valuesFor(properties), WRITER)
  if (!landed.ok) throw new Error(`\`${pageTypeSlug}/${name}\` was not written: ${landed.why}`)
  const written = await getPage({ pageTypeSlug, where: [{ key: "slug", eq: name }] })
  if (written === null) {
    throw new Error(`\`${pageTypeSlug}/${name}\` landed and then read back as nothing`)
  }
  return written
}

export async function patchPage(
  pageTypeSlug: string,
  name: string,
  values: Readonly<Record<string, Json>>
): Promise<void> {
  const landed = await patchPageThere(pageTypeSlug, name, valuesFor(values), WRITER)
  if (!landed.ok) throw new Error(`\`${pageTypeSlug}/${name}\` was not patched: ${landed.why}`)
}
