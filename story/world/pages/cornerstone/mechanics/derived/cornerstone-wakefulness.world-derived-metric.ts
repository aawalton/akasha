import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const cornerstoneWakefulness = {
  id: "01a0dee7-ba7b-7084-b6fd-e83123684331",
  type: "page-type/world-derived-metric",
  slug: "cornerstone-wakefulness",
  title: "Wakefulness",
  world: "world/cornerstone",
  definition: "the Waking Stone's level, the sum of the Depths of its six Faculties",
  formula: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Touch counts toward Wakefulness as every other Faculty does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wakefulness is at most twenty-eight, Touch at three and the other five at five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tier the Waking Stone is at is the highest tier its Wakefulness reaches.",
    },
  ],
} as const satisfies WorldDerivedMetric
