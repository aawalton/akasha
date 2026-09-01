import type { Fetcher, Sleeper } from "@akasha/pages-query"
import {
  askComposed as askComposedThere,
  askPage as askPageThere,
  askPageTypes as askPageTypesThere,
  askShape as askShapeThere,
  type Asked,
  type Backed,
  type ComposedQuery,
  type Declaration,
  type Named,
  type Naming,
  type NamingAsk,
  type NamingAsked,
  type PageAsked,
  type PageTypeShape,
  type QueryAnswer,
  type QueryRow,
  type RosterAsked,
  type ShapeAsked,
  type Value,
  type WholePage,
} from "@akasha/pages-query/ask"
import {
  askedFrom,
  naming as namingHere,
  reported,
  shaped,
} from "../../../tools/lib/page-query-answer.ts"
import { backedTypes } from "../../../tools/lib/page-query.ts"
import { askedOf, here, standsHere, whyIn } from "./here.ts"

export type {
  Asked,
  Backed,
  ComposedQuery,
  Declaration,
  Named,
  Naming,
  NamingAsk,
  NamingAsked,
  PageAsked,
  PageTypeShape,
  QueryAnswer,
  QueryRow,
  RosterAsked,
  ShapeAsked,
  Value,
  WholePage,
}

export async function askComposed(
  query: ComposedQuery,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Asked> {
  if (!standsHere(query["page-type"])) return askComposedThere(query, fetcher, naps)
  return askedOf(askedFrom(here(), JSON.stringify(query)))
}

export async function askPage(
  pageType: string,
  name: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<PageAsked> {
  if (!standsHere(pageType)) return askPageThere(pageType, name, fetcher, naps)
  const said = reported(here(), pageType, name)
  if (said.status === 404) {
    return {
      outcome: "absent",
      why: `\`${pageType}/${name}\`: the pages on this machine hold no page of that type under that name`,
    }
  }
  if (said.status !== 200) return { outcome: "unasked", why: whyIn(said), status: said.status }
  return { outcome: "found", page: said.body as WholePage }
}

export async function askShape(
  pageType: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<ShapeAsked> {
  if (!standsHere(pageType)) return askShapeThere(pageType, fetcher, naps)
  const said = shaped(here(), pageType)
  if (said.status !== 200) return { ok: false, why: whyIn(said), status: said.status }
  return { ok: true, shape: said.body as PageTypeShape }
}

export async function askPageTypes(
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<RosterAsked> {
  const mine = backedTypes(here())
  const there = await askPageTypesThere(fetcher, naps)
  if (!there.ok) return { ok: true, types: mine }
  const held = new Set(mine.map((one) => one.slug))
  return { ok: true, types: [...mine, ...there.types.filter((one) => !held.has(one.slug))] }
}

export async function askNaming(
  ask: NamingAsk,
  _fetcher?: Fetcher,
  _naps?: Sleeper
): Promise<NamingAsked> {
  const params = new URLSearchParams()
  if (ask.pageTypes !== undefined) params.set("page-types", ask.pageTypes.join(","))
  if (ask.limit !== undefined) params.set("limit", String(ask.limit))
  const said = namingHere(here(), ask.key, ask.name, params)
  if (said.status !== 200) return { ok: false, why: whyIn(said), status: said.status }
  const body = said.body as { readonly naming?: readonly Naming[] }
  return { ok: true, naming: body.naming ?? [] }
}
