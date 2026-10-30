import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const cost = {
  id: "01a08b9b-fa99-70de-a5e9-aab7a5e793ae",
  type: "page-type/readout-group",
  slug: "cost",
  definition: "the cost of what Alan does in his current hour",
  wireKeyName: "habit",
  servedBy: ["module/cost-stoplight"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The number is the multiplier the block's safety and difficulty price it at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color this group draws is read with the surplus rather than off a scale.",
    },
  ],
  createdAt: "2026-09-10T13:57:30.393Z",
  updatedAt: "2026-10-30T17:10:36.739Z",
} as const satisfies ReadoutGroup
