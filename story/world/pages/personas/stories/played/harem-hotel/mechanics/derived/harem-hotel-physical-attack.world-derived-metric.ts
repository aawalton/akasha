import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const haremHotelPhysicalAttack = {
  id: "01a0de4e-cf62-715f-baa9-c6b519a033bc",
  type: "page-type/world-derived-metric",
  slug: "harem-hotel-physical-attack",
  title: "Physical Attack",
  definition: "how hard a character in the Harem Hotel strikes with a weapon",
  formula: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Might counts for half again as much as finesse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The weapon's own attack is added whole.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing is rounded here.",
    },
  ],
} as const satisfies WorldDerivedMetric
