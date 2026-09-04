import { valuesOfType } from "@akasha/indexes"
import { AKASHA, resolveRoots } from "@akasha/pages-system/checkout-roots"

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

export function checkoutRoot(): string {
  const roots = resolveRoots() as unknown as Readonly<Record<string, string>>
  const root = roots[AKASHA]
  if (root === undefined || root === "") {
    throw new Error("no akasha checkout stands here, so no fitness page can be read")
  }
  return root
}

export function rowOf(value: Readonly<Record<string, unknown>>): Row {
  const held = { ...value } as Record<string, Value>
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

function saidOf(row: Row, key: string): string | null {
  const value = row[key]
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return null
}

function empty(row: Row, key: string): boolean {
  const value = row[key]
  if (value === undefined || value === null) return true
  if (Array.isArray(value)) return value.length === 0
  return value === ""
}

export function passes(row: Row, one: Test): boolean {
  if ("eq" in one) return row[one.key] === one.eq
  if ("in" in one) {
    const said = saidOf(row, one.key)
    return said !== null && one.in.includes(said)
  }
  if ("contains" in one) {
    const said = saidOf(row, one.key)
    return said !== null && said.toLowerCase().includes(one.contains.toLowerCase())
  }
  return empty(row, one.key)
}

export function ordered(rows: readonly Row[], order: readonly Ordering[]): readonly Row[] {
  const first = order[0]
  if (first === undefined) return rows
  const way = first.dir === "desc" ? -1 : 1
  return [...rows].sort((one, two) => {
    const a = saidOf(one, first.by) ?? ""
    const b = saidOf(two, first.by) ?? ""
    return way * (a < b ? -1 : a > b ? 1 : 0)
  })
}

export function cutTo(row: Row, select: readonly string[]): Row {
  const held: Record<string, Value> = {}
  for (const key of select) {
    const value = row[key]
    if (value !== undefined) held[key] = value
  }
  return rowOf(held)
}

export function shapedIn(rows: readonly Row[], asking: Asking): readonly Row[] {
  const kept = rows.filter((row) => (asking.where ?? []).every((one) => passes(row, one)))
  const sorted = asking.order === undefined ? kept : ordered(kept, asking.order)
  const cut = asking.limit === undefined ? sorted : sorted.slice(0, asking.limit)
  return asking.select === undefined ? cut : cut.map((row) => cutTo(row, asking.select ?? []))
}

export async function rowsFor(asking: Asking): Promise<Rows> {
  let held: readonly Row[]
  try {
    held = valuesOfType(checkoutRoot(), asking.pageTypeSlug).map((one) => rowOf(one.value))
  } catch (why) {
    const said = why instanceof Error ? why.message : String(why)
    return { unread: `\`${asking.pageTypeSlug}\` went unread: ${said}` }
  }
  return { rows: shapedIn(held, asking) }
}

export async function rowFor(asking: Asking): Promise<OneRow> {
  const found = await rowsFor({ ...asking, limit: asking.limit ?? 1 })
  if ("unread" in found) return found
  return { row: found.rows[0] ?? null }
}
