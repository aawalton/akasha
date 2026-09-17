import {
  takenIn as closedIn,
  type Taken,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { extended } from "akasha/graph/predicate/pages/extended/extended.graph-predicate.ts"
import { answeringOver } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  listedAt,
  readingIn,
  type Valued,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  slugAt,
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  COMPUTED,
  type Counting,
  carriedFor,
  computedInto,
  computedOver,
  gatheredFor,
  type Named,
  pagesOfType,
} from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import {
  matches,
  weigh,
} from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const PAGE_TYPE = "page-type"

const TARGET_PAGE_TYPE = "targetPageType"

const MEMBERS = "members"

const PARTED_BY = "/"

const TYPE = "type"

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
  readonly files?: readonly string[]
}

export type Row = Readonly<Record<string, unknown>>

export type Asked =
  | { readonly rows: readonly Row[]; readonly n: number }
  | { readonly refused: string }

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

export type Declared = {
  readonly key: string
  readonly type: string
  readonly drawnBy: readonly string[]
  readonly memberDrawnBy: readonly (readonly string[])[]
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

export function titledAs(propertySlug: string): string {
  return propertySlug
    .split("-")
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(" ")
}

export type Climbing = (pageTypeSlug: string) => readonly Value[]

function nearestFirst(taken: Taken): readonly string[] {
  const held = [...taken.reached].reverse()
  return held.sort((one, two) => (taken.stepsTo.get(one) ?? 0) - (taken.stepsTo.get(two) ?? 0))
}

export function climbing(given: string | Reading): Climbing {
  const reading = readingIn(given)
  const index = answeringOver(reading, (path) => valueByPath(reading, path))
  const asked = { index, bodyAt: (path: string) => reading.read(path) }
  return (pageTypeSlug) => {
    const listed = listedAt(reading, PAGE_TYPE, pageTypeSlug)[0]
    if (listed === undefined) return []
    const found: Value[] = []
    for (const path of nearestFirst(closedIn(extended, [listed.path], asked))) {
      const one = index.valueAt(path)
      if (one !== null) found.push(one)
    }
    return found
  }
}

function drawnFor(climb: Climbing, pageTypeSlug: string): readonly string[] {
  if (pageTypeSlug === "") return []
  const found: string[] = []
  for (const one of climb(pageTypeSlug)) {
    const slug = textAt(one, "slug")
    if (slug !== null && !found.includes(slug)) found.push(slug)
  }
  return found.length === 0 ? [pageTypeSlug] : found
}

function memberTypesIn(page: Value | undefined): readonly string[] {
  if (page === undefined) return []
  const held = page[MEMBERS]
  if (!Array.isArray(held)) return []
  const found: string[] = []
  for (const one of held) {
    if (typeof one !== "string") continue
    const at = one.indexOf(PARTED_BY)
    if (at > 0) found.push(one.slice(0, at))
  }
  return found
}

function declaredOf(
  one: Carried,
  page: Value | undefined,
  on: string,
  drawnBy: readonly string[],
  memberDrawnBy: readonly (readonly string[])[]
): Declared {
  return {
    key: one.propertySlug,
    type: one.pageTypeSlug,
    drawnBy,
    memberDrawnBy,
    title: titledAs(one.propertySlug),
    pageId: page === undefined ? "" : (textAt(page, "id") ?? ""),
    on,
    values: page === undefined ? null : (page["values"] ?? null),

    targetSlug: page === undefined ? null : slugAt(page, TARGET_PAGE_TYPE),
    slugProperty: one.propertySlug,
    mayBeGone: !one.required,
  }
}

export function ownerFor(climb: Climbing, pageTypeSlug: string): string | null {
  for (const one of climb(pageTypeSlug)) {
    const owner = textAt(one, "owner")
    if (owner !== null && owner !== "") return slugOf(owner)
  }
  return null
}

export function shaping(root: string, pageTypeSlug: string): Shaped {
  if (listedAt(root, PAGE_TYPE, pageTypeSlug).length === 0) return { shape: null }
  try {
    const named: Named = new Map()
    const climb = climbing(root)
    const own = pagesOfType(root, named, PAGE_TYPE).get(pageTypeSlug)
    const declarations = carriedFor(root, pageTypeSlug).map((one) => {
      const page = pagesOfType(root, named, one.pageTypeSlug).get(one.pagePropertySlug)
      return declaredOf(
        one,
        page,
        pageTypeSlug,
        drawnFor(climb, one.pageTypeSlug),
        memberTypesIn(page).map((slug) => drawnFor(climb, slug))
      )
    })
    return {
      shape: {
        pageType: pageTypeSlug,
        pageTypeId: own === undefined ? "" : (textAt(own, "id") ?? ""),
        ownerSlug: ownerFor(climb, pageTypeSlug),
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

function sluggedIn(one: Valued): Valued {
  const named = textAt(one.value, TYPE)
  if (named === null) return one
  const said = slugOf(named)
  return said === named ? one : { path: one.path, value: { ...one.value, [TYPE]: said } }
}

function byPath(one: Valued, two: Valued): number {
  return one.path < two.path ? -1 : one.path > two.path ? 1 : 0
}

function workedIn(carried: readonly Carried[]): ReadonlySet<string> {
  const worked = new Set<string>()
  for (const one of carried) if (one.pageTypeSlug === COMPUTED) worked.add(one.key)
  return worked
}

function narrowsOn(query: Query, worked: ReadonlySet<string>): boolean {
  if (query.sortBy !== undefined && worked.has(query.sortBy)) return true
  const where = query.where
  if (where === undefined) return false
  return Object.keys(where).some((key) => worked.has(key))
}

function carriesWorked(query: Query, worked: ReadonlySet<string>): boolean {
  const keys = query.keys
  if (keys === undefined) return worked.size > 0
  return keys.some((key) => worked.has(key))
}

function entriesWanted(query: Query, worked: ReadonlySet<string>): ReadonlySet<string> | null {
  if (query.keys === undefined || worked.size > 0) return null
  const wanted = new Set<string>(query.keys)
  for (const key of Object.keys(query.where ?? {})) wanted.add(key)
  if (query.sortBy !== undefined) wanted.add(query.sortBy)
  return wanted
}

function orderedIn(query: Query, held: readonly Valued[]): readonly Valued[] {
  const sortBy = query.sortBy
  const sorted = [...held].sort(byPath)
  if (sortBy !== undefined) sorted.sort((one, two) => weigh(one.value[sortBy], two.value[sortBy]))
  if (query.descending === true) sorted.reverse()
  return sorted
}

function takenIn(query: Query, sorted: readonly Valued[]): readonly Valued[] {
  const limit = query.limit
  const from = query.offset ?? 0
  return limit === undefined ? sorted.slice(from) : sorted.slice(from, from + limit)
}

function answering(query: Query, taken: readonly Valued[], n: number): Asked {
  return { rows: taken.map((one) => rowOf(one.value, query.keys)), n }
}

const ANSWERED_AT_MOST = 64_000_000

function overflowing(slug: string, over: number, n: number, ceiling: number): string {
  return `\`${slug}\` answers past the ${ceiling} characters one answer carries — ${over} of ${n} rows matching filled it. Narrow by \`keys\`, by \`limit\`, or to a page type under \`${slug}\`.`
}

export function answeringWithin(
  query: Query,
  asked: { readonly rows: readonly Row[]; readonly n: number },
  ceiling: number = ANSWERED_AT_MOST
): { readonly said: string } | { readonly refused: string } {
  const held: string[] = []
  let carried = 0
  for (const row of asked.rows) {
    const one = JSON.stringify(row)
    carried += one.length
    if (carried > ceiling) {
      return { refused: overflowing(query.pageTypeSlug, held.length, asked.n, ceiling) }
    }
    held.push(one)
  }
  return { said: `{"rows":[${held.join(",")}],"n":${asked.n}}` }
}

function countedFirst(root: string, query: Query, counting: readonly Counting[]): Asked {
  const counted = computedInto(root, counting)
  const darkened = unlit(query, counted.dark)
  if (darkened !== null) return { refused: darkened }
  const held = counted.rows.filter((one) => narrows(one.value, query.where))
  const sorted = orderedIn(query, held)
  return answering(query, takenIn(query, sorted), sorted.length)
}

function narrowedFirst(
  root: string,
  query: Query,
  counting: readonly Counting[],
  working: boolean
): Asked {
  const rows = counting.map((one) => one.row)
  const held = rows.filter((one) => narrows(one.value, query.where))
  const sorted = orderedIn(query, held)
  const taken = takenIn(query, sorted)
  if (!working) return answering(query, taken, sorted.length)
  const counted = computedOver(root, counting, taken)
  const darkened = unlit(query, counted.dark)
  if (darkened !== null) return { refused: darkened }
  return answering(query, counted.rows, sorted.length)
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
  if (listedAt(root, PAGE_TYPE, query.pageTypeSlug).length === 0) {
    return { refused: `\`${query.pageTypeSlug}\` names no page type the index holds` }
  }
  const reading = readingIn(root)
  const carried = carriedFor(reading, query.pageTypeSlug)
  const unnamed = unkeyed(query, carried)
  if (unnamed !== null) return { refused: unnamed }
  try {
    const worked = workedIn(carried)
    const counting = gatheredFor(
      root,
      query.pageTypeSlug,
      carried,
      query.files ?? [],
      reading,
      entriesWanted(query, worked)
    ).map((one) => {
      const row = sluggedIn(one.row)
      return row === one.row ? one : { ...one, row }
    })
    if (narrowsOn(query, worked)) return countedFirst(root, query, counting)
    return narrowedFirst(root, query, counting, carriesWorked(query, worked))
  } catch (thrown) {
    return { refused: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}
