import { askComposed as composedAnswer } from "../store-questioning/store-questioning.module.code.ts"
import {
  type Fetcher,
  pagesFetcher,
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

export async function askComposed(
  query: ComposedQuery,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<Asked> {
  return composedAnswer(query, fetcher, naps)
}

type Flat = Readonly<Record<string, unknown>>

export type Named = {
  readonly pageType: string
  readonly name: string
  readonly title: string | null
  readonly at: string | null
}

export type WholePage = {
  readonly pageType: string
  readonly name: string
  readonly at: string
  readonly values: Record<string, unknown>
  readonly relations: Record<string, readonly Named[]>
}

export type PageAsked =
  | { readonly outcome: "found"; readonly page: WholePage }
  | { readonly outcome: "absent"; readonly why: string }
  | { readonly outcome: "unasked"; readonly why: string; readonly status?: number }

export type Declaration = {
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

export type PageTypeShape = {
  readonly pageType: string
  readonly pageTypeId: string
  readonly ownerSlug: string | null
  readonly declarations: readonly Declaration[]
}

export type ShapeAsked =
  | { readonly ok: true; readonly shape: PageTypeShape }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type Backed = {
  readonly slug: string
  readonly repo: string | null
  readonly glob: string | null
  readonly heldBy: readonly string[]
  readonly namedFor: string | null
}

export type RosterAsked =
  | { readonly ok: true; readonly types: readonly Backed[] }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type Naming = {
  readonly pageType: string
  readonly key: string
  readonly rows: readonly QueryRow[]
}

export type NamingAsk = {
  readonly key: string
  readonly name: string
  readonly pageTypes?: readonly string[]
  readonly limit?: number
}

export type NamingAsked =
  | { readonly ok: true; readonly naming: readonly Naming[] }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type Given = Readonly<Record<string, string | readonly string[]>>

const PAGE_TYPE = "page-type"

const PROPERTY_TAIL = "-property"

const NO_SAVED_QUERY_SAYS =
  "the store answers one composed query at a time and holds no page under `page-query`, so nothing here can look up a query by name"

function textAt(values: Flat, key: string): string | null {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : null
}

async function rowsOf(
  query: ComposedQuery,
  fetcher: Fetcher,
  naps: Sleeper
): Promise<readonly Flat[] | { readonly why: string; readonly status?: number }> {
  const asked = await composedAnswer(query, fetcher, naps)
  if (!asked.ok)
    return { why: asked.why, ...(asked.status === undefined ? {} : { status: asked.status }) }
  return asked.answer.rows.map((one) => one.values)
}

function failed(held: { readonly why: string; readonly status?: number }): {
  ok: false
  why: string
  status?: number
} {
  return { ok: false, why: held.why, ...(held.status === undefined ? {} : { status: held.status }) }
}

export async function askPage(
  pageType: string,
  name: string,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<PageAsked> {
  const what = `${pageType}/${name}`
  const held = await rowsOf({ "page-type": pageType, where: { slug: { is: name } } }, fetcher, naps)
  if (!Array.isArray(held)) {
    const bad = held as { why: string; status?: number }
    return {
      outcome: "unasked",
      why: bad.why,
      ...(bad.status === undefined ? {} : { status: bad.status }),
    }
  }
  const first = held[0]
  if (first === undefined) {
    return {
      outcome: "absent",
      why: `\`${what}\`: the store was asked and holds no page of that type under that name`,
    }
  }
  return {
    outcome: "found",
    page: {
      pageType,
      name,
      at: what,
      values: { ...first },
      relations: {},
    },
  }
}

export async function askPageTypes(
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<RosterAsked> {
  const held = await rowsOf({ "page-type": PAGE_TYPE, keys: ["slug", "pluralSlug"] }, fetcher, naps)
  if (!Array.isArray(held)) return failed(held as { why: string; status?: number })
  return {
    ok: true,
    types: held.flatMap((one) => {
      const slug = textAt(one, "slug")
      if (slug === null) return []
      return [{ slug, repo: null, glob: null, heldBy: [], namedFor: textAt(one, "pluralSlug") }]
    }),
  }
}

async function propertyPages(
  fetcher: Fetcher,
  naps: Sleeper
): Promise<Map<string, Flat> | { readonly why: string; readonly status?: number }> {
  const types = await rowsOf({ "page-type": PAGE_TYPE, keys: ["slug"] }, fetcher, naps)
  if (!Array.isArray(types)) return types as { why: string; status?: number }
  const named = types
    .map((one) => textAt(one, "slug"))
    .filter((one): one is string => one?.endsWith(PROPERTY_TAIL) === true)
  const found = new Map<string, Flat>()
  for (const one of named) {
    const pages = await rowsOf({ "page-type": one }, fetcher, naps)
    if (!Array.isArray(pages)) continue
    for (const page of pages) {
      const slug = textAt(page, "slug")
      if (slug !== null && !found.has(slug)) found.set(slug, page)
    }
  }
  return found
}

function declaredFrom(one: Flat, page: Flat | undefined, on: string): Declaration | null {
  const slug = typeof one.pagePropertySlug === "string" ? one.pagePropertySlug : null
  if (slug === null) return null
  return {
    key: page === undefined ? slug : (textAt(page, "propertySlug") ?? slug),
    type: page === undefined ? "page-property" : (textAt(page, "pageTypeSlug") ?? "page-property"),
    title: page === undefined ? slug : (textAt(page, "definition") ?? slug),
    pageId: page === undefined ? "" : (textAt(page, "id") ?? ""),
    on,
    values: one.many === true ? [] : null,
    targetSlug: page === undefined ? null : textAt(page, "targetPageTypeSlug"),
    slugProperty: page === undefined ? null : textAt(page, "propertySlug"),
    mayBeGone: one.required !== true,
  }
}

export async function askShape(
  pageType: string,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<ShapeAsked> {
  const held = await rowsOf(
    { "page-type": PAGE_TYPE, where: { slug: { is: pageType } } },
    fetcher,
    naps
  )
  if (!Array.isArray(held)) return failed(held as { why: string; status?: number })
  const first = held[0]
  if (first === undefined) {
    return { ok: false, why: `the store holds no page type under \`${pageType}\`` }
  }
  const pages = await propertyPages(fetcher, naps)
  if (!(pages instanceof Map)) return failed(pages as { why: string; status?: number })
  const stated = Array.isArray(first.properties) ? (first.properties as readonly Flat[]) : []
  return {
    ok: true,
    shape: {
      pageType,
      pageTypeId: textAt(first, "id") ?? "",
      ownerSlug: null,
      declarations: stated.flatMap((one) => {
        const slug = typeof one.pagePropertySlug === "string" ? one.pagePropertySlug : null
        const made = declaredFrom(one, slug === null ? undefined : pages.get(slug), pageType)
        return made === null ? [] : [made]
      }),
    },
  }
}

export async function askNaming(
  ask: NamingAsk,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<NamingAsked> {
  let over = ask.pageTypes
  if (over === undefined) {
    const types = await rowsOf({ "page-type": PAGE_TYPE, keys: ["slug"] }, fetcher, naps)
    if (!Array.isArray(types)) return failed(types as { why: string; status?: number })
    over = types.map((one) => textAt(one, "slug")).filter((one): one is string => one !== null)
  }
  const naming: Naming[] = []
  for (const pageType of over) {
    const rows = await rowsOf(
      {
        "page-type": pageType,
        where: { [ask.key]: { is: ask.name } },
        ...(ask.limit === undefined ? {} : { limit: ask.limit }),
      },
      fetcher,
      naps
    )
    if (!Array.isArray(rows) || rows.length === 0) continue
    naming.push({ pageType, key: ask.key, rows: rows.map((values) => ({ values: { ...values } })) })
  }
  return { ok: true, naming }
}

export async function askNamed(
  slug: string,
  _fetcher: Fetcher = pagesFetcher(),
  _naps: Sleeper = sleep
): Promise<Asked> {
  return { ok: false, why: `\`${slug}\` went unasked: ${NO_SAVED_QUERY_SAYS}` }
}

export async function askTaking(
  slug: string,
  _given: Given,
  _fetcher: Fetcher = pagesFetcher(),
  _naps: Sleeper = sleep
): Promise<Asked> {
  return { ok: false, why: `\`${slug}\` went unasked: ${NO_SAVED_QUERY_SAYS}` }
}
