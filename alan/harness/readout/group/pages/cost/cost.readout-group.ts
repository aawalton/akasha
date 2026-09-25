import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const cost = {
  id: "01a08b9b-fa99-70de-a5e9-aab7a5e793ae",
  type: "page-type/readout-group",
  slug: "cost",
  definition: "what the block Alan is in costs him for each hour it runs",
  wireKeyName: "habit",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is the multiplier the block's safety and difficulty price it at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color this group draws is read with the surplus rather than off a scale.",
    },
  ],
} as const satisfies ReadoutGroup
