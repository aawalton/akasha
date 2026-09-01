import { valuesOfType } from "../../indexes/index-reading/index-reading.module.code.ts"
import type { Value } from "../../page/page-value/page-value.module.code.ts"

export const TESTS_RUN: readonly string[] = [
  "is",
  "in",
  "not-in",
  "has",
  "contains",
  "starts-with",
  "ends-with",
  "empty",
  "at-or-after",
  "after",
  "before",
  "at-or-before",
]

export type Test = {
  readonly is?: string
  readonly in?: readonly string[]
  readonly "not-in"?: readonly string[]
  readonly has?: string
  readonly contains?: string | readonly string[]
  readonly "starts-with"?: string
  readonly "ends-with"?: string
  readonly empty?: boolean
  readonly "at-or-after"?: string | number
  readonly after?: string | number
  readonly before?: string | number
  readonly "at-or-before"?: string | number
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

function ordered(held: unknown, bound: unknown): number {
  if (typeof held === "number" && typeof bound === "number") return held - bound
  const one = String(held ?? "")
  const two = String(bound ?? "")
  const first = Date.parse(one)
  const second = Date.parse(two)
  if (Number.isFinite(first) && Number.isFinite(second)) return first - second
  return one < two ? -1 : one > two ? 1 : 0
}

function containing(held: unknown, bound: unknown): boolean {
  const each = Array.isArray(bound) ? bound : [bound]
  if (Array.isArray(held)) return each.some((one) => held.includes(one))
  if (typeof held !== "string") return false
  return each.some((one) => held.includes(String(one)))
}

function matches(held: unknown, name: string, bound: unknown): boolean {
  if (name === "empty") return bare(held) === bound
  if (name === "is") return held === bound
  if (name === "in") return Array.isArray(bound) && bound.includes(held as never)
  if (name === "not-in") return Array.isArray(bound) && !bound.includes(held as never)
  if (name === "has") return Array.isArray(held) && held.includes(bound)
  if (name === "contains") return containing(held, bound)
  if (name === "starts-with") return typeof held === "string" && held.startsWith(String(bound))
  if (name === "ends-with") return typeof held === "string" && held.endsWith(String(bound))
  if (name === "at-or-after") return !bare(held) && ordered(held, bound) >= 0
  if (name === "after") return !bare(held) && ordered(held, bound) > 0
  if (name === "before") return !bare(held) && ordered(held, bound) < 0
  if (name === "at-or-before") return !bare(held) && ordered(held, bound) <= 0
  return false
}

export function meets(value: Value, key: string, test: Test): boolean {
  const held = value[key]
  for (const [name, bound] of Object.entries(test)) {
    if (bound === undefined) continue
    if (!matches(held, name, bound)) return false
  }
  return true
}

function unrun(where: Readonly<Record<string, Test>> | undefined): string | null {
  if (where === undefined) return null
  for (const [key, test] of Object.entries(where)) {
    if (test === null || typeof test !== "object" || Array.isArray(test)) {
      return `\`where.${key}\` is no test this takes`
    }
    for (const name of Object.keys(test)) {
      if (TESTS_RUN.includes(name)) continue
      return `\`where.${key}.${name}\` is no test this runs. the tests are ${TESTS_RUN.join(", ")}`
    }
  }
  return null
}

function narrows(value: Value, where: Readonly<Record<string, Test>> | undefined): boolean {
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
  const unknown = unrun(query.where)
  if (unknown !== null) return { refused: unknown }
  const held = valuesOfType(root, query.pageTypeSlug).filter((one) =>
    narrows(one.value, query.where)
  )
  const sortBy = query.sortBy
  const sorted =
    sortBy === undefined
      ? [...held]
      : [...held].sort((one, two) => weigh(one.value[sortBy], two.value[sortBy]))
  if (query.descending === true) sorted.reverse()
  const from = offset ?? 0
  const taken = limit === undefined ? sorted.slice(from) : sorted.slice(from, from + limit)
  return { rows: taken.map((one) => rowOf(one.value, query.keys)) }
}
