import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const haremHotelLeveling = {
  id: "01a0de4e-cf62-7069-8c91-a842c9cabc81",
  type: "page-type/world-derived-metric",
  slug: "harem-hotel-leveling",
  title: "Leveling",
  definition:
    "the attribute points a character in the Harem Hotel has won by the levels it has gained",
  formula: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character starts at the first level having cleared no floor.",
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
  ],
} as const satisfies WorldDerivedMetric
