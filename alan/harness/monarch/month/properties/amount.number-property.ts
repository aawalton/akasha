import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const amount = {
  id: "01a0680b-2b00-7003-9d28-7b5e1f4c2104",
  type: "page-type/number-property",
  slug: "amount",
  propertySlug: "amount",
  definition: "the money a Monarch transaction moves in dollars",
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
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:44:57.585Z",
} as const satisfies NumberProperty
