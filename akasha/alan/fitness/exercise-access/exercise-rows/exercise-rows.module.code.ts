import { askComposed } from "@tools/lib/page-query-client"

export type Value =
  | string
  | number
  | boolean
  | null
  | readonly Value[]
  | { readonly [key: string]: Value }

export type Row = {
  readonly id: string
  readonly seq: number | null
  readonly title: string | null
  readonly slug: string | null
  readonly [key: string]: Value | undefined
}

export type Test =
  | { readonly key: string; readonly eq: string | number | boolean }
  | { readonly key: string; readonly in: readonly string[] }
  | { readonly key: string; readonly contains: string }
  | { readonly key: string; readonly empty: true }

export type Ordering = { readonly by: string; readonly dir: "asc" | "desc" }

export type Asking = {
  readonly pageTypeSlug: string
  readonly where?: readonly Test[]
  readonly order?: readonly Ordering[]
  readonly select?: readonly string[]
  readonly limit?: number
}

export type Rows = { readonly rows: readonly Row[] } | { readonly unread: string }

export type OneRow = { readonly row: Row | null } | { readonly unread: string }

const TEXT_KEYS: ReadonlySet<string> = new Set(["id", "slug", "title"])

const NUMBER_SAID = /^-?\d+(\.\d+)?$/

export function dashed(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

export function humped(key: string): string {
  return key.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}

function scalarOf(said: unknown): Value {
  if (typeof said !== "string") return (said ?? null) as Value
  if (said === "true") return true
  if (said === "false") return false
  if (said !== "" && NUMBER_SAID.test(said)) return Number(said)
  return said
}

function textOf(said: unknown): Value {
  return typeof said === "string" ? said : null
}

export function rowOf(values: Readonly<Record<string, unknown>>): Row {
  const held: Record<string, Value> = {}
  for (const [key, value] of Object.entries(values)) {
    const name = humped(key)
    held[name] = TEXT_KEYS.has(name) ? textOf(value) : scalarOf(value)
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

function testOf(one: Test): Readonly<Record<string, unknown>> {
  if ("eq" in one) return { is: one.eq }
  if ("in" in one) return { in: one.in }
  if ("contains" in one) return { contains: one.contains }
  return { empty: true }
}

export function composedFor(asking: Asking): Readonly<Record<string, unknown>> {
  const where: Record<string, unknown> = {}
  for (const one of asking.where ?? []) where[dashed(one.key)] = testOf(one)
  const first = asking.order?.[0]
  return {
    "page-type": asking.pageTypeSlug,
    ...(Object.keys(where).length === 0 ? {} : { where }),
    ...(first === undefined
      ? {}
      : { "sort-by": dashed(first.by), descending: first.dir === "desc" }),
    ...(asking.select === undefined ? {} : { keys: asking.select.map(dashed) }),
    ...(asking.limit === undefined ? {} : { limit: asking.limit }),
  }
}

export async function rowsFor(asking: Asking): Promise<Rows> {
  const asked = await askComposed(composedFor(asking))
  if (!asked.ok) return { unread: `\`${asking.pageTypeSlug}\` went unread: ${asked.why}` }
  return { rows: asked.rows.map((one) => rowOf(one.values)) }
}

export async function rowFor(asking: Asking): Promise<OneRow> {
  const found = await rowsFor({ ...asking, limit: asking.limit ?? 1 })
  if ("unread" in found) return found
  return { row: found.rows[0] ?? null }
}

export function textIn(row: Row, key: string): string | undefined {
  const value = row[key]
  return typeof value === "string" ? value : undefined
}

export function numberIn(row: Row, key: string): number | undefined {
  const value = row[key]
  return typeof value === "number" ? value : undefined
}

export function boolIn(row: Row, key: string): boolean | undefined {
  const value = row[key]
  return typeof value === "boolean" ? value : undefined
}

export function textsIn(row: Row, key: string): readonly string[] {
  const value = row[key]
  if (!Array.isArray(value)) return []
  return value.filter((one): one is string => typeof one === "string")
}

export function titleOf(row: Row): string {
  return row.title ?? row.id
}
