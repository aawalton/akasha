import {
  ASK_CEILING_MS,
  type Fetcher,
  pagesFetcher,
  postingTo,
  type Sleeper,
  sleep,
} from "../store-reaching/store-reaching.module.code.ts"

export type Value = string | number | boolean | readonly string[]

export type QueryRow = { readonly at?: string; readonly values: Record<string, unknown> }

export type QueryAnswer = {
  readonly n: number
  readonly value: number | null
  readonly over: number | null
  readonly rows: readonly QueryRow[]
  readonly faults: readonly string[]
  readonly omitted: readonly string[]
  readonly unfound: readonly string[]
}

export type Asked =
  | { readonly ok: true; readonly answer: QueryAnswer }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type ComposedQuery = {
  readonly "page-type": string
  readonly where?: Readonly<Record<string, unknown>>
  readonly "count-by"?: readonly string[]
  readonly keys?: readonly string[]
  readonly "sort-by"?: string
  readonly descending?: boolean
  readonly limit?: number
  readonly offset?: number
  readonly function?: "sum" | "mean"
  readonly target?: string
}

type Flat = Readonly<Record<string, unknown>>

const STORE_TESTS = ["is", "in", "has", "empty"]

const KNOWN_TESTS = [
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

const DROPPING_SAYS =
  "a test this client cannot run is refused rather than dropped, because dropping one answers with every page of the type instead of the pages asked for"

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

export function meets(values: Flat, key: string, test: Flat): boolean {
  const held = values[key]
  for (const [name, bound] of Object.entries(test)) {
    if (!matches(held, name, bound)) return false
  }
  return true
}

export function testsUnknownIn(where: Flat): readonly string[] {
  const found: string[] = []
  for (const [key, test] of Object.entries(where)) {
    if (typeof test !== "object" || test === null || Array.isArray(test)) {
      found.push(`\`${key}\` is given ${JSON.stringify(test)}, which names no test`)
      continue
    }
    if (Object.keys(test).length === 0) found.push(`\`${key}\` is given a test stating nothing`)
    for (const name of Object.keys(test)) {
      if (!KNOWN_TESTS.includes(name)) found.push(`\`${name}\` on \`${key}\` is no test`)
    }
  }
  return found
}

function storeTakes(test: Flat): boolean {
  for (const [name, bound] of Object.entries(test)) {
    if (!STORE_TESTS.includes(name)) return false
    if (name === "is" && typeof bound !== "string") return false
    if (name === "has" && typeof bound !== "string") return false
    if (name === "empty" && typeof bound !== "boolean") return false
    if (name === "in" && !(Array.isArray(bound) && bound.every((one) => typeof one === "string"))) {
      return false
    }
  }
  return true
}

function weigh(one: unknown, two: unknown): number {
  if (typeof one === "number" && typeof two === "number") return one - two
  return String(one ?? "").localeCompare(String(two ?? ""))
}

function numbersIn(rows: readonly Flat[], target: string): readonly number[] {
  const held: number[] = []
  for (const row of rows) {
    const one = row[target]
    if (typeof one === "boolean" || bare(one)) continue
    const read = typeof one === "number" ? one : Number(one)
    if (Number.isFinite(read)) held.push(read)
  }
  return held
}

function reduced(
  rows: readonly Flat[],
  how: "sum" | "mean",
  target: string | undefined
): { value: number | null; over: number | null } {
  if (target === undefined) return { value: null, over: null }
  const held = numbersIn(rows, target)
  if (held.length === 0) return { value: how === "sum" ? 0 : null, over: 0 }
  const total = held.reduce((one, two) => one + two, 0)
  return { value: how === "sum" ? total : total / held.length, over: held.length }
}

function groupedBy(
  rows: readonly Flat[],
  by: readonly string[],
  how: "sum" | "mean" | undefined,
  target: string | undefined
): readonly Flat[] {
  const groups = new Map<string, { keys: Record<string, unknown>; held: Flat[] }>()
  for (const row of rows) {
    const keys: Record<string, unknown> = {}
    for (const key of by) keys[key] = row[key] ?? null
    const at = JSON.stringify(by.map((key) => keys[key]))
    const found = groups.get(at) ?? { keys, held: [] }
    found.held.push(row)
    groups.set(at, found)
  }
  return [...groups.values()].map((one) => ({
    ...one.keys,
    n: one.held.length,
    ...(how === undefined ? {} : { value: reduced(one.held, how, target).value }),
  }))
}

function rowsIn(body: unknown): readonly Flat[] | null {
  if (typeof body !== "object" || body === null || !("rows" in body)) return null
  const rows = (body as { rows: unknown }).rows
  if (!Array.isArray(rows)) return null
  for (const one of rows) if (typeof one !== "object" || one === null) return null
  return rows as readonly Flat[]
}

function projected(rows: readonly Flat[], keys: readonly string[] | undefined): readonly Flat[] {
  if (keys === undefined) return rows
  return rows.map((row) => {
    const held: Record<string, unknown> = {}
    for (const key of keys) if (key in row) held[key] = row[key]
    return held
  })
}

export async function askComposed(
  query: ComposedQuery,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<Asked> {
  const pageTypeSlug = query["page-type"]
  const what = `a composed query over \`${pageTypeSlug}\``
  const where = query.where ?? {}
  const unknown = testsUnknownIn(where)
  if (unknown.length > 0) {
    return { ok: false, why: `${what} states ${unknown.join(", ")} — ${DROPPING_SAYS}` }
  }
  const pushed: Record<string, unknown> = {}
  const kept: Record<string, unknown> = {}
  for (const [key, test] of Object.entries(where)) {
    if (storeTakes(test as Flat)) pushed[key] = test
    else kept[key] = test
  }
  const by = query["count-by"] ?? []
  const how = query.function
  const here = Object.keys(kept).length > 0 || by.length > 0 || how !== undefined
  const sortBy = query["sort-by"]
  const body = {
    pageTypeSlug,
    ...(Object.keys(pushed).length > 0 ? { where: pushed } : {}),
    ...(here
      ? {}
      : {
          ...(query.keys === undefined ? {} : { keys: [...query.keys] }),
          ...(sortBy === undefined ? {} : { sortBy }),
          ...(query.descending === undefined ? {} : { descending: query.descending }),
          ...(query.limit === undefined ? {} : { limit: query.limit }),
          ...(query.offset === undefined ? {} : { offset: query.offset }),
        }),
  }
  const reached = await postingTo("/ask", what, body, fetcher, ASK_CEILING_MS, naps)
  if (!reached.ok) return reached
  const answered = rowsIn(reached.body)
  if (answered === null) {
    return { ok: false, why: `${what} answered in a shape this reader cannot read` }
  }
  if (!here) {
    return {
      ok: true,
      answer: {
        n: answered.length,
        value: null,
        over: null,
        rows: answered.map((values) => ({ values: { ...values } })),
        faults: [],
        omitted: [],
        unfound: [],
      },
    }
  }
  const met = answered.filter((row) => {
    for (const [key, test] of Object.entries(kept)) if (!meets(row, key, test as Flat)) return false
    return true
  })
  const whole = how === undefined ? { value: null, over: null } : reduced(met, how, query.target)
  const shaped = by.length > 0 ? groupedBy(met, by, how, query.target) : met
  const sorted =
    sortBy === undefined
      ? [...shaped]
      : [...shaped].sort((one, two) => weigh(one[sortBy], two[sortBy]))
  if (query.descending === true) sorted.reverse()
  const from = query.offset ?? 0
  const taken =
    query.limit === undefined ? sorted.slice(from) : sorted.slice(from, from + query.limit)
  const out = by.length > 0 ? taken : projected(taken, query.keys)
  return {
    ok: true,
    answer: {
      n: shaped.length,
      value: whole.value,
      over: whole.over,
      rows: out.map((values) => ({ values: { ...values } })),
      faults: [],
      omitted: [],
      unfound: [],
    },
  }
}
