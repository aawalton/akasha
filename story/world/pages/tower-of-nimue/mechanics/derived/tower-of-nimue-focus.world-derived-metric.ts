import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const towerOfNimueFocus = {
  id: "01a0deea-7d40-7953-94a9-3b64aff2e4fe",
  type: "page-type/world-derived-metric",
  slug: "tower-of-nimue-focus",
  title: "Focus",
  world: "world/tower-of-nimue",
  definition:
    "the resource a climber in the Tower of Nimue spends on active essences, five for each ATT",
  formula: {},
} as const satisfies WorldDerivedMetric
