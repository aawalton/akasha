import type { ReadoutScale } from "akasha/alan/harness/readout/scale/readout-scale.page-type.types.ts"

export const refusalCount = {
  id: "01a0d933-d4bf-710f-a1ed-e54ec1377293",
  type: "page-type/readout-scale",
  slug: "refusal-count",
  definition: "how many definitions the grammar still refuses",
  blackAt: 10000,
  redAt: 1000,
  yellowAt: 100,
  greenAt: 1,
  blueAt: 0,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs are sized to a count near ten thousand rather than to a daily inbox.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count of ten thousand or more is black.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count under a hundred is yellow no longer.",
    },
  ],
} as const satisfies ReadoutScale
