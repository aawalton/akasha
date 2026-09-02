import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.ts"
import type { Cards } from "./properties/cards.page-property-entry.ts"
import type { EsoPatronId } from "./properties/eso-patron-id.number-property.ts"

export type TemperTributePatron = TemperPursuitThing & {
  esoPatronId: EsoPatronId
  cards: Cards
}

export const temperTributePatron = {
  id: "01a06153-0ea9-7008-ab66-7b7e073ebf51",
  pageTypeSlug: "page-type",
  slug: "temper-tribute-patron",
  definition: "a patron a Tales of Tribute deck is built around",
  pluralSlug: "temper-tribute-patrons",
  extendsSlug: "page-type/temper-pursuit-thing",
  partSlugs: [
    "number-property/card-index",
    "number-property/eso-patron-id",
    "page-property-entry/cards",
    "text-property/base-card-name",
    "text-property/upgrade-card-name",
  ],
  properties: [
    { pagePropertySlug: "category", required: true, many: false },
    { pagePropertySlug: "eso-patron-id", required: true, many: false },
    { pagePropertySlug: "eso-collectible-id", required: true, many: false },
    { pagePropertySlug: "cards", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A patron is reached by the collectible the game grants when the patron is won.",
    },
  ],
} as const satisfies PageType
