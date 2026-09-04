import { listedAt, type Valued, valuesOfType } from "@akasha/indexes"
import { entriedValue } from "@akasha/pages-system/page-entries"
import {
  type Barred,
  type Declared as Declaring,
  FORMULA,
  type Working,
  workedInto,
  workingOver,
} from "@akasha/pages-system/page-formulas"
import {
  type Carried,
  propertiesFrom,
  sourceAmong,
  sourceIn,
} from "@akasha/pages-system/page-type-properties"
import { wholeValue } from "@akasha/pages-system/page-uncommitted"
import { slugAt, textAt, type Value } from "@akasha/pages-system/page-value"
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

export function carriedFor(root: string, pageTypeSlug: string): readonly Carried[] {
  const source = sourceAmong(
    valuesOfType(root, PAGE_TYPE).map((one) => one.value),
    sourceIn(root, () => null)
  )
  return propertiesFrom(pageTypeSlug, source)
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

type Held = Map<string, ReadonlyMap<string, Value>>

function pagesOfType(root: string, held: Held, pageTypeSlug: string): ReadonlyMap<string, Value> {
  const found = held.get(pageTypeSlug)
  if (found !== undefined) return found
  const made = new Map<string, Value>()
  for (const one of valuesOfType(root, pageTypeSlug)) {
    const slug = textAt(one.value, "slug")
    if (slug !== null && !made.has(slug)) made.set(slug, one.value)
  }
  held.set(pageTypeSlug, made)
  return made
}

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

export function ownerFor(root: string, held: Held, pageTypeSlug: string): string | null {
  const seen = new Set<string>()
  let at: string | null = pageTypeSlug
  while (at !== null && at !== "" && !seen.has(at)) {
    seen.add(at)
    const page = pagesOfType(root, held, PAGE_TYPE).get(at)
    if (page === undefined) return null
    const owner = textAt(page, "ownerSlug")
    if (owner !== null && owner !== "") return lastSegment(owner)
    const above = textAt(page, "extendsSlug")
    at = above === null || above === "" ? null : lastSegment(above)
  }
  return null
}

export function shaping(root: string, pageTypeSlug: string): Shaped {
  if (listedAt(root, PAGE_TYPE, pageTypeSlug).length === 0) return { shape: null }
  try {
    const held: Held = new Map()
    const own = pagesOfType(root, held, PAGE_TYPE).get(pageTypeSlug)
    const declarations = carriedFor(root, pageTypeSlug).map((one) =>
      declaredOf(
        one,
        pagesOfType(root, held, one.pageTypeSlug).get(one.pagePropertySlug),
        pageTypeSlug
      )
    )
    return {
      shape: {
        pageType: pageTypeSlug,
        pageTypeId: own === undefined ? "" : (textAt(own, "id") ?? ""),
        ownerSlug: ownerFor(root, held, pageTypeSlug),
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

function valuedFor(
  root: string,
  pageTypeSlug: string,
  carried: readonly Carried[]
): readonly Valued[] {
  return valuesOfType(root, pageTypeSlug).map((one) => {
    const beside = wholeValue(root, one.path, one.value)
    const whole = entriedValue(root, one.path, beside, carried)
    return whole === one.value ? one : { path: one.path, value: whole }
  })
}

export function declaredFor(
  root: string,
  held: Held,
  carried: readonly Carried[]
): readonly Declaring[] {
  return carried.map((one) => {
    const page =
      one.pageTypeSlug === FORMULA
        ? pagesOfType(root, held, FORMULA).get(one.pagePropertySlug)
        : undefined
    return {
      slug: one.propertySlug,
      key: one.key,
      sort: one.pageTypeSlug,
      many: one.many,
      formula: page === undefined ? null : textAt(page, "formula"),
      holds: page === undefined ? null : textAt(page, "holds"),
    }
  })
}

export function workingFor(
  root: string,
  pageTypeSlug: string,
  carried: readonly Carried[]
): Working | Barred | null {
  return workingOver(
    pageTypeSlug,
    declaredFor(root, new Map<string, ReadonlyMap<string, Value>>(), carried)
  )
}

function unworked(query: Query, barred: Barred): string | null {
  const keys = new Set(barred.keys)
  for (const [key, at] of askedFor(query)) {
    if (!keys.has(key)) continue
    return `\`${at}\` names \`${key}\`, and no formula is worked out for that key here: ${barred.barred}. the keys darkened by the same fault are ${[...barred.keys].sort().join(", ")}`
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
  const working = workingFor(root, query.pageTypeSlug, carried)
  if (working !== null && "barred" in working) {
    const named = unworked(query, working)
    if (named !== null) return { refused: named }
  }
  let held: readonly Valued[]
  try {
    const read = valuedFor(root, query.pageTypeSlug, carried)
    const worked =
      working === null || "barred" in working
        ? read
        : read.map((one) => ({ path: one.path, value: workedInto(working, one.value, at) }))
    held = worked.filter((one) => narrows(one.value, query.where))
  } catch (thrown) {
    return { refused: thrown instanceof Error ? thrown.message : String(thrown) }
  }
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
