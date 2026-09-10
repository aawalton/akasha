import type { ReadoutGroup } from "../readout-group.page-type.types.ts"

export const cost = {
  id: "01a08b9b-fa99-70de-a5e9-aab7a5e793ae",
  pageTypeSlug: "readout-group",
  type: "readout-group",
  slug: "cost",
  definition: "what the block Alan is in costs him for each hour it runs",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is the multiplier the block's safety and difficulty price it at.",
    },
    {
      invariantKind: "departure",
      statement: "The color this group draws is read with the surplus rather than off a scale.",
    },
  ],
} as const satisfies ReadoutGroup
