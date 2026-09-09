import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
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
  extends: ["page-type/page"],
  parts: [
    "boolean-property/struck-out",
    "number-property/uses-used",
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
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "relation-property/collection", required: true, many: false },
    { pagePropertySlug: "text-property/deal-key", required: true, many: false },
    { pagePropertySlug: "text-property/fine-print", required: false, many: false },
    { pagePropertySlug: "relation-property/locations", required: true, many: true, maxCount: null },
    { pagePropertySlug: "text-property/offer-text", required: true, many: false },
    { pagePropertySlug: "text-property/offer-type", required: true, many: false },
    { pagePropertySlug: "text-property/redemption-code", required: false, many: false },
    { pagePropertySlug: "text-property/section", required: true, many: false },
    { pagePropertySlug: "boolean-property/struck-out", required: true, many: false },
    { pagePropertySlug: "select-property/use-limit", required: true, many: false },
    { pagePropertySlug: "number-property/uses-used", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deal names every place the deal is redeemable at.",
    },
    {
      invariantKind: "departure",
      statement: "A deal with no cap on its uses has `no-limit` rather than a count.",
    },
    {
      invariantKind: "departure",
      statement: "A deal struck out on the card is struck out here.",
    },
  ],
} as const satisfies PageType
