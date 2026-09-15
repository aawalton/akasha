import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const amount = {
  id: "01a0680b-2b00-7003-9d28-7b5e1f4c2104",
  type: "page-type/number-property",
  slug: "amount",
  propertySlug: "amount",
  definition: "how much money moved, in dollars",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An amount below zero is money leaving the account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An amount is in dollars rather than in cents.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
