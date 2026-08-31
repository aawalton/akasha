import { readFileSync } from "node:fs"
import { join } from "node:path"
import { everyOfType } from "../../indexes/index-reading/index-reading.module.code.ts"
import { loadedFrom, type Value } from "../../page/page-value/page-value.module.code.ts"

export type Test = {
  readonly is?: string
  readonly in?: readonly string[]
  readonly has?: string
  readonly empty?: boolean
}

export type Query = {
  readonly pageTypeSlug: string
  readonly where?: Readonly<Record<string, Test>>
  readonly keys?: readonly string[]
  readonly sortBy?: string
  readonly descending?: boolean
  readonly limit?: number
  readonly offset?: number
}

export type Row = Readonly<Record<string, unknown>>

export type Asked = { readonly rows: readonly Row[] } | { readonly refused: string }

function bare(held: unknown): boolean {
  if (held === undefined || held === null || held === "") return true
  return Array.isArray(held) && held.length === 0
}

function meets(value: Value, key: string, test: Test): boolean {
  const held = value[key]
  if (test.empty !== undefined && bare(held) !== test.empty) return false
  if (test.is !== undefined && held !== test.is) return false
  if (test.in !== undefined && (typeof held !== "string" || !test.in.includes(held))) return false
  if (test.has !== undefined && (!Array.isArray(held) || !held.includes(test.has))) return false
  return true
}

function passes(value: Value, where: Readonly<Record<string, Test>> | undefined): boolean {
  if (where === undefined) return true
  for (const [key, test] of Object.entries(where)) if (!meets(value, key, test)) return false
  return true
}

function rowOf(value: Value, keys: readonly string[] | undefined): Row {
  if (keys === undefined) return { ...value }
  const held: Record<string, unknown> = {}
  for (const key of keys) if (key in value) held[key] = value[key]
  return held
}

function weigh(one: unknown, two: unknown): number {
  if (typeof one === "number" && typeof two === "number") return one - two
  return String(one ?? "").localeCompare(String(two ?? ""))
}

export function asking(root: string, query: Query): Asked {
  const { limit, offset } = query
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 0)) {
    return { refused: `a limit is a whole number that is not below nothing, and ${limit} is not` }
  }
  if (offset !== undefined && (!Number.isInteger(offset) || offset < 0)) {
    return {
      refused: `an offset is a whole number that is not below nothing, and ${offset} is not`,
    }
  }
  const standing = [...everyOfType(root, query.pageTypeSlug)].sort((one, two) =>
    one.path.localeCompare(two.path)
  )
  const held: { value: Value; path: string }[] = []
  for (const one of standing) {
    let body = ""
    try {
      body = readFileSync(join(root, one.path), "utf8")
    } catch (why) {
      return { refused: `${one.path} is named by the index and did not read: ${String(why)}` }
    }
    const loaded = loadedFrom(body)
    if (loaded.failed !== null) return { refused: `${one.path} did not load: ${loaded.failed}` }
    if (loaded.value === null) return { refused: `${one.path} declares no value` }
    if (passes(loaded.value, query.where)) held.push({ value: loaded.value, path: one.path })
  }
  const sortBy = query.sortBy
  if (sortBy !== undefined) {
    held.sort((one, two) => weigh(one.value[sortBy], two.value[sortBy]))
  }
  if (query.descending === true) held.reverse()
  const from = offset ?? 0
  const taken = limit === undefined ? held.slice(from) : held.slice(from, from + limit)
  return { rows: taken.map((one) => rowOf(one.value, query.keys)) }
}
