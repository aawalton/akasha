import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const locationDeal = {
  id: "01a06585-5fc5-715e-850c-9b88e5597728",
  pageTypeSlug: "page-type",
  type: "page-type",
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
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/collection", required: true, many: false },
    { pageProperty: "text-property/deal-key", required: true, many: false },
    { pageProperty: "text-property/fine-print", required: false, many: false },
    { pageProperty: "relation-property/locations", required: true, many: true, maxCount: null },
    { pageProperty: "text-property/offer-text", required: true, many: false },
    { pageProperty: "text-property/offer-type", required: true, many: false },
    { pageProperty: "text-property/redemption-code", required: false, many: false },
    { pageProperty: "text-property/section", required: true, many: false },
    { pageProperty: "boolean-property/struck-out", required: true, many: false },
    { pageProperty: "select-property/use-limit", required: true, many: false },
    { pageProperty: "number-property/uses-used", required: true, many: false },
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
  types: "ts",
} as const satisfies PageType
