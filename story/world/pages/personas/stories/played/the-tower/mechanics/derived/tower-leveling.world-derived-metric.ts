import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const towerLeveling = {
  id: "01a0de20-a6d4-73a4-a12e-c9a785855d39",
  type: "page-type/world-derived-metric",
  slug: "tower-leveling",
  title: "Leveling",
  definition: "the attribute points a character in the Tower has won by the levels it has gained",
  formula: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A climber starts at the first level having cleared no floor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One level is won for each floor cleared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Three attribute points come with each level won.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No experience is counted, the floor cleared being the whole of what raises a level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A level is the third way a climber grows, beside the skill rungs and the attunement ranks.",
    },
  ],
} as const satisfies WorldDerivedMetric
