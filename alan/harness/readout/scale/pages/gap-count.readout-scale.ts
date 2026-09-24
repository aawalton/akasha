import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const gapCount = {
  id: "01a0d4e6-eace-79d8-bdb3-75e175ebd6d7",
  type: "page-type/readout-scale",
  slug: "gap-count",
  definition: "how many gaps the domains still state",
  blackAt: 2000,
  redAt: 500,
  yellowAt: 100,
  greenAt: 1,
  blueAt: 0,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs are sized to a count near a thousand rather than to a daily inbox.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count near a thousand is red, and black only once that count has doubled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count under a hundred is yellow no longer.",
    },
  ],
} as const satisfies ReadoutScale
