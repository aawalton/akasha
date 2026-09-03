import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { Collection } from "../locations/properties/collection.relation-property.ts"
import type { DealKey } from "./properties/deal-key.text-property.ts"
import type { FinePrint } from "./properties/fine-print.text-property.ts"
import type { Locations } from "./properties/locations.relation-property.ts"
import type { OfferText } from "./properties/offer-text.text-property.ts"
import type { OfferType } from "./properties/offer-type.text-property.ts"
import type { RedemptionCode } from "./properties/redemption-code.text-property.ts"
import type { Section } from "./properties/section.text-property.ts"
import type { StruckOut } from "./properties/struck-out.boolean-property.ts"
import type { UseLimit } from "./properties/use-limit.select-property.ts"
import type { UsesUsed } from "./properties/uses-used.number-property.ts"

export type LocationDeal = Page & {
  title: Title
  collection: Collection
  dealKey: DealKey
  finePrint?: FinePrint
  locations: readonly Locations[]
  offerText: OfferText
  offerType: OfferType
  redemptionCode?: RedemptionCode
  section: Section
  struckOut: StruckOut
  useLimit: UseLimit
  usesUsed: UsesUsed
}

export const locationDeal = {
  id: "01a06585-5fc5-715e-850c-9b88e5597728",
  pageTypeSlug: "page-type",
  slug: "location-deal",
  definition: "an offer redeemable at places on the map",
  pluralSlug: "location-deals",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/struck-out",
    "number-property/uses-used",
    "relation-property/collection",
    "relation-property/locations",
    "select-property/use-limit",
    "text-property/deal-key",
    "text-property/fine-print",
    "text-property/offer-text",
    "text-property/offer-type",
    "text-property/redemption-code",
    "text-property/section",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "collection", required: true, many: false },
    { pagePropertySlug: "deal-key", required: true, many: false },
    { pagePropertySlug: "fine-print", required: false, many: false },
    { pagePropertySlug: "locations", required: true, many: true, max: null },
    { pagePropertySlug: "offer-text", required: true, many: false },
    { pagePropertySlug: "offer-type", required: true, many: false },
    { pagePropertySlug: "redemption-code", required: false, many: false },
    { pagePropertySlug: "section", required: true, many: false },
    { pagePropertySlug: "struck-out", required: true, many: false },
    { pagePropertySlug: "use-limit", required: true, many: false },
    { pagePropertySlug: "uses-used", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deal names every place it is redeemable at.",
    },
    {
      invariantKind: "departure",
      statement: "A deal with no cap on its uses carries `no-limit` rather than a count.",
    },
    {
      invariantKind: "departure",
      statement: "A deal struck out on the card is struck out here.",
    },
  ],
} as const satisfies PageType
