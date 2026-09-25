import { join } from "node:path"
import { baseOf } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import {
  listedAt,
  readingIn,
  type Valued,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Computed } from "akasha/page/modules/computing/page-computing.module.code.ts"
import {
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
  type Reads,
  type Testing,
} from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import type {
  Faulted,
  Refusal,
} from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"
import {
  meets,
  narrows,
  type Test,
  unrun,
  weigh,
} from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import {
  WITHHELD,
  withheldAt,
  withheldFor,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

const PAGE_TYPE = "page-type"

const TYPE = "type"

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
  | {
      readonly rows: readonly Row[]
      readonly n: number
      readonly read?: Reads
      readonly at?: string
    }
  | { readonly refused: string; readonly withheld?: true }

const LORE_REFUSED = WITHHELD.join("\n")

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

function testsFor(query: Query): ReadonlyMap<string, Testing> | null {
  const where = query.where
  if (where === undefined) return null
  const made = new Map<string, Testing>()
  for (const [key, test] of Object.entries(where)) {
    if (key !== TYPE) made.set(key, (value) => meets(value, key, test))
  }
  return made.size === 0 ? null : made
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

function answering(
  query: Query,
  taken: readonly Valued[],
  n: number,
  read?: Reads
): Faulted<Asked> {
  const rows = taken.map((one) => rowOf(one.value, query.keys))
  return read === undefined || read.size === 0 ? { rows, n } : { rows, n, read }
}

const ANSWERED_AT_MOST = 64_000_000

function overflowing(slug: string, over: number, n: number, ceiling: number): string {
  return `\`${slug}\` answers past the ${ceiling} characters one answer carries — ${over} of ${n} rows matching filled it. Narrow by \`keys\`, by \`limit\`, or to a page type under \`${slug}\`.`
}

export function answeringWithin(
  query: Query,
  asked: { readonly rows: readonly Row[]; readonly n: number; readonly at?: string },
  ceiling: number = ANSWERED_AT_MOST
): { readonly said: string } | Refusal {
  const held: string[] = []
  let carried = 0
  for (const row of asked.rows) {
    const one = JSON.stringify(row)
    carried += one.length
    if (carried > ceiling) {
      const refused = overflowing(query.pageTypeSlug, held.length, asked.n, ceiling)
      return { refused, fault: "caller" }
    }
    held.push(one)
  }
  const at = asked.at === undefined ? "" : `,"at":${JSON.stringify(asked.at)}`
  return { said: `{"rows":[${held.join(",")}],"n":${asked.n}${at}}` }
}

function loreRefused(
  root: string,
  sorted: readonly Valued[],
  withheld: readonly string[]
): Faulted<Asked> | null {
  if (withheld.length === 0) return null
  if (!sorted.some((one) => withheldAt(join(root, one.path), withheld))) return null
  return { refused: LORE_REFUSED, withheld: true, fault: "caller" }
}

function countedFirst(
  root: string,
  query: Query,
  counting: readonly Counting[],
  withheld: readonly string[]
): Faulted<Asked> {
  const counted = computedInto(root, counting)
  const darkened = unlit(query, counted.dark)
  if (darkened !== null) return { refused: darkened, fault: "service" }
  const held = counted.rows.filter((one) => narrows(one.value, query.where))
  const sorted = orderedIn(query, held)
  const lore = loreRefused(root, sorted, withheld)
  if (lore !== null) return lore
  return answering(query, takenIn(query, sorted), sorted.length, counted.read)
}

function narrowedFirst(
  root: string,
  query: Query,
  counting: readonly Counting[],
  working: boolean,
  withheld: readonly string[]
): Faulted<Asked> {
  const rows = counting.map((one) => one.row)
  const held = rows.filter((one) => narrows(one.value, query.where))
  const sorted = orderedIn(query, held)
  const lore = loreRefused(root, sorted, withheld)
  if (lore !== null) return lore
  const taken = takenIn(query, sorted)
  if (!working) return answering(query, taken, sorted.length)
  const counted = computedOver(root, counting, taken)
  const darkened = unlit(query, counted.dark)
  if (darkened !== null) return { refused: darkened, fault: "service" }
  return answering(query, counted.rows, sorted.length, counted.read)
}

export function asking(
  root: string,
  query: Query,
  withheld: readonly string[] = []
): Faulted<Asked> {
  const { limit, offset } = query
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 0)) {
    const refused = `a limit is a whole number that is not below nothing, and ${limit} is not`
    return { refused, fault: "caller" }
  }
  if (offset !== undefined && (!Number.isInteger(offset) || offset < 0)) {
    const refused = `an offset is a whole number that is not below nothing, and ${offset} is not`
    return { refused, fault: "caller" }
  }
  const unknown = unrun(query.where)
  if (unknown !== null) return { refused: unknown, fault: "caller" }
  if (listedAt(root, PAGE_TYPE, query.pageTypeSlug).length === 0) {
    const refused = `\`${query.pageTypeSlug}\` names no page type the index holds`
    return { refused, fault: "caller" }
  }
  const reading = readingIn(root)
  const carried = carriedFor(reading, query.pageTypeSlug)
  const unnamed = unkeyed(query, carried)
  if (unnamed !== null) return { refused: unnamed, fault: "caller" }
  const named = new Set(askedFor(query).map(([key]) => key))
  const answered = (one: Computed): boolean => one.askedByName !== true || named.has(one.key)
  try {
    const worked = workedIn(carried)
    const counting = gatheredFor(
      root,
      query.pageTypeSlug,
      carried,
      query.files ?? [],
      reading,
      entriesWanted(query, worked),
      testsFor(query)
    ).map((one) => {
      const row = sluggedIn(one.row)
      const computed = one.computed.every(answered) ? one.computed : one.computed.filter(answered)
      return row === one.row && computed === one.computed ? one : { row, computed }
    })
    if (narrowsOn(query, worked)) return countedFirst(root, query, counting, withheld)
    return narrowedFirst(root, query, counting, carriesWorked(query, worked), withheld)
  } catch (thrown) {
    return { refused: thrown instanceof Error ? thrown.message : String(thrown), fault: "service" }
  }
}

export function askingAt(root: string, query: Query, asker: string | null = null): Faulted<Asked> {
  const at = baseOf(root)
  const asked = asking(root, query, withheldFor(root, asker))
  return "refused" in asked ? asked : { ...asked, at }
}
