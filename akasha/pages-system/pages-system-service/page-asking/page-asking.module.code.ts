import { valuesOfType } from "@akasha/indexes"
import { matches, weigh } from "@akasha/pages-query/where-testing"
import type { Value } from "@akasha/pages-system/page-value"

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
    if (Object.keys(test).length === 0) return `\`where.${key}\` states no test`
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
