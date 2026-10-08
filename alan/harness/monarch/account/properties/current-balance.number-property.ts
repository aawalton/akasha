import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const currentBalance = {
  id: "01a0680a-1a00-7003-ab52-6d3f8c9a1104",
  type: "page-type/number-property",
  slug: "current-balance",
  propertySlug: "current-balance",
  definition: "the figure an account was at when the sync last read it",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A balance is in dollars rather than in cents.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A balance is the figure the sync last read rather than the figure any row sums to.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
