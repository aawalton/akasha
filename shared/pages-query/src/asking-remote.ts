// The remote half of `./asking.ts`, with the local-checkout half severed.
//
// `./asking.ts` is a local-first facade: it asks the checkout standing on this machine when
// `standsHere(pageType)`, and otherwise goes to the store over HTTP. Reaching the checkout means
// importing `./here.ts` -> `@akasha/pages-system/checkout-roots` and the `tools/lib` query engine,
// which are Node-only — `node:fs`, `node:path`, `node:url`. A browser has no checkout, so that half
// can never be taken there, but importing it still drags those builtins into the client bundle,
// where Vite's externalization proxy throws on first property access and hydration never begins.
//
// This module is that facade with `standsHere` fixed at false. It is NOT the same as importing
// `@akasha/pages-query/ask` directly: `askComposed` keeps the `askedAsSpelled` adapter, which
// camelizes declared keys on the way in (the store holds `valueSlug` where a page type declares
// `value-slug`) and answers both spellings on the way back. Dropping it would leave multi-word keys
// silently unmatched rather than loudly broken.
import type { Fetcher, Sleeper } from "@akasha/pages-query"
import {
  askComposed as askComposedThere,
  askNaming as askNamingThere,
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
import { askedAsSpelled } from "./store-spelling.ts"

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
  return askedAsSpelled(query, (asked) => askComposedThere(asked, fetcher, naps))
}

export async function askPage(
  pageType: string,
  name: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<PageAsked> {
  return askPageThere(pageType, name, fetcher, naps)
}

export async function askShape(
  pageType: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<ShapeAsked> {
  return askShapeThere(pageType, fetcher, naps)
}

export async function askPageTypes(fetcher?: Fetcher, naps?: Sleeper): Promise<RosterAsked> {
  return askPageTypesThere(fetcher, naps)
}

// `./asking.ts` answers this one from the checkout alone. Off the checkout the store is the only
// place the naming can come from, so this asks it there rather than refusing.
export async function askNaming(
  ask: NamingAsk,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<NamingAsked> {
  return askNamingThere(ask, fetcher, naps)
}
