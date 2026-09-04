import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CurrentBalance = number

export const currentBalance = {
  id: "01a0680a-1a00-7003-ab52-6d3f8c9a1104",
  pageTypeSlug: "number-property",
  slug: "current-balance",
  propertySlug: "current-balance",
  definition: "what an account stood at when the sync last read it",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A balance is in dollars rather than in cents.",
    },
    {
      invariantKind: "departure",
      statement: "A balance is what the sync last read rather than what any row sums to.",
    },
  ],
} as const satisfies NumberProperty
