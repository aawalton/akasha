import { listedAt, type Valued } from "@akasha/indexes"
import { type Barred, type Working, workedInto } from "@akasha/pages-system/page-formulas"
import type { Carried } from "@akasha/pages-system/page-type-properties"
import { slugAt, slugsIn, textAt, type Value } from "@akasha/pages-system/page-value"
import {
  carriedFor,
  computedInto,
  gatheredFor,
  type Named,
  pagesOfType,
} from "../kinds-gathering/kinds-gathering.module.code.ts"
import { matches, weigh } from "../where-testing/where-testing.module.code.ts"

const PAGE_TYPE = "page-type"

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

export function keysOf(root: string, pageTypeSlug: string): ReadonlySet<string> {
  return new Set(carriedFor(root, pageTypeSlug).map((one) => one.key))
}

export type Declared = {
  readonly key: string
  readonly type: string
  readonly title: string
  readonly pageId: string
  readonly on: string
  readonly values: unknown
  readonly targetSlug: string | null
  readonly slugProperty: string | null
  readonly mayBeGone: boolean
}

export type Shape = {
  readonly pageType: string
  readonly pageTypeId: string
  readonly ownerSlug: string | null
  readonly declarations: readonly Declared[]
}

export type Shaped = { readonly shape: Shape | null } | { readonly refused: string }

export function declaredOf(one: Carried, page: Value | undefined, on: string): Declared {
  const said = one.pagePropertySlug
  return {
    key: one.propertySlug,
    type: one.pageTypeSlug,
    title: page === undefined ? said : (textAt(page, "definition") ?? said),
    pageId: page === undefined ? "" : (textAt(page, "id") ?? ""),
    on,
    values: one.many ? [] : null,
    targetSlug: page === undefined ? null : slugAt(page, "targetPageTypeSlug"),
    slugProperty: one.propertySlug,
    mayBeGone: !one.required,
  }
}

function lastSegment(said: string): string {
  const at = said.lastIndexOf("/")
  return at === -1 ? said : said.slice(at + 1)
}

export function ownerFor(root: string, named: Named, pageTypeSlug: string): string | null {
  const walked = new Set<string>()
  const waiting: string[] = [pageTypeSlug]
  for (let at = 0; at < waiting.length; at += 1) {
    const own = waiting[at]
    if (own === undefined || own === "" || walked.has(own)) continue
    walked.add(own)
    const page = pagesOfType(root, named, PAGE_TYPE).get(own)
    if (page === undefined) continue
    const owner = textAt(page, "ownerSlug")
    if (owner !== null && owner !== "") return lastSegment(owner)
    for (const above of [...slugsIn(page["extendsSlug"])].reverse()) waiting.push(above)
  }
  return null
}

export function shaping(root: string, pageTypeSlug: string): Shaped {
  if (listedAt(root, PAGE_TYPE, pageTypeSlug).length === 0) return { shape: null }
  try {
    const named: Named = new Map()
    const own = pagesOfType(root, named, PAGE_TYPE).get(pageTypeSlug)
    const declarations = carriedFor(root, pageTypeSlug).map((one) =>
      declaredOf(
        one,
        pagesOfType(root, named, one.pageTypeSlug).get(one.pagePropertySlug),
        pageTypeSlug
      )
    )
    return {
      shape: {
        pageType: pageTypeSlug,
        pageTypeId: own === undefined ? "" : (textAt(own, "id") ?? ""),
        ownerSlug: ownerFor(root, named, pageTypeSlug),
        declarations,
      },
    }
  } catch (thrown) {
    return { refused: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

export function askedFor(query: Query): readonly (readonly [string, string])[] {
  const wanted: (readonly [string, string])[] = []
  if (query.where !== undefined) {
    for (const key of Object.keys(query.where)) wanted.push([key, "where"])
  }
  if (query.sortBy !== undefined) wanted.push([query.sortBy, "sortBy"])
  if (query.keys !== undefined) for (const key of query.keys) wanted.push([key, "keys"])
  return wanted
}

function unkeyed(query: Query, carried: readonly Carried[]): string | null {
  const wanted = askedFor(query)
  if (wanted.length === 0) return null
  const keys = new Set(carried.map((one) => one.key))
  for (const [key, at] of wanted) {
    if (keys.has(key)) continue
    return `\`${at}\` names \`${key}\`, and the \`${query.pageTypeSlug}\` page type declares no such key. the keys are ${[...keys].sort().join(", ")}`
  }
  return null
}

function unlit(query: Query, dark: ReadonlyMap<string, string>): string | null {
  if (dark.size === 0) return null
  for (const [key, at] of askedFor(query)) {
    const why = dark.get(key)
    if (why === undefined) continue
    return `\`${at}\` names \`${key}\`, and no calculation is worked out for that key here: ${why}. the keys darkened are ${[...dark.keys()].sort().join(", ")}`
  }
  return null
}

function unworked(query: Query, barred: readonly Barred[]): string | null {
  for (const one of barred) {
    const keys = new Set(one.keys)
    for (const [key, at] of askedFor(query)) {
      if (!keys.has(key)) continue
      return `\`${at}\` names \`${key}\`, and no formula is worked out for that key here: ${one.barred}. the keys darkened by the same fault are ${[...one.keys].sort().join(", ")}`
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

function byPath(one: Valued, two: Valued): number {
  return one.path < two.path ? -1 : one.path > two.path ? 1 : 0
}

function workedFor(
  rows: readonly Valued[],
  working: readonly (Working | null)[],
  now: number
): readonly Valued[] {
  return rows.map((one, at) => {
    const held = working[at] ?? null
    return held === null ? one : { path: one.path, value: workedInto(held, one.value, now) }
  })
}

export function asking(root: string, query: Query, at: number = Date.now()): Asked {
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
  if (listedAt(root, PAGE_TYPE, query.pageTypeSlug).length === 0) {
    return { refused: `\`${query.pageTypeSlug}\` names no page type the index holds` }
  }
  const carried = carriedFor(root, query.pageTypeSlug)
  const unnamed = unkeyed(query, carried)
  if (unnamed !== null) return { refused: unnamed }
  let held: readonly Valued[]
  try {
    const gathered = gatheredFor(root, query.pageTypeSlug, carried)
    const named = unworked(query, gathered.barred)
    if (named !== null) return { refused: named }
    const counted = computedInto(gathered.counting)
    const darkened = unlit(query, counted.dark)
    if (darkened !== null) return { refused: darkened }
    const worked = workedFor(
      counted.rows,
      gathered.counting.map((one) => one.working),
      at
    )
    held = worked.filter((one) => narrows(one.value, query.where))
  } catch (thrown) {
    return { refused: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  const sortBy = query.sortBy
  const sorted = [...held].sort(byPath)
  if (sortBy !== undefined) sorted.sort((one, two) => weigh(one.value[sortBy], two.value[sortBy]))
  if (query.descending === true) sorted.reverse()
  const from = offset ?? 0
  const taken = limit === undefined ? sorted.slice(from) : sorted.slice(from, from + limit)
  return { rows: taken.map((one) => rowOf(one.value, query.keys)) }
}
