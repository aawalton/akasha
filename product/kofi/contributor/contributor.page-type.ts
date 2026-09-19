import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const contributor = {
  id: "01a0ba90-5086-7a55-b63d-5bf48f551250",
  type: "page-type/page-type",
  slug: "contributor",
  definition: "a person who has given Alan something and holds the weight that giving earned",
  extends: ["page-type/page"],
  parts: [
    "text-property/contributor-email-hash",
    "number-property/contribution-point-balance",
    "page-property-entry/contribution-point-transactions",
    "instant-property/contribution-point-at",
    "number-property/contribution-points",
    "text-property/stripe-charge-id",
  ],
  properties: [
    { pageProperty: "text-property/contributor-email-hash", required: true, many: false },
    { pageProperty: "number-property/contribution-point-balance", required: true, many: false },
    {
      pageProperty: "page-property-entry/contribution-point-transactions",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor is a person outside this system rather than a person page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One contributor holds one address, and a second address is a second contributor.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
