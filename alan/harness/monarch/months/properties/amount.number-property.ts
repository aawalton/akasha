import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type Amount = number

export const amount = {
  id: "01a0680b-2b00-7003-9d28-7b5e1f4c2104",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "amount",
  propertySlug: "amount",
  definition: "how much money moved, in dollars",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An amount below zero is money leaving the account.",
    },
    {
      invariantKind: "departure",
      statement: "An amount is in dollars rather than in cents.",
    },
  ],
} as const satisfies NumberProperty
