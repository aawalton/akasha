import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const towerOfNimueHp = {
  id: "01a0deea-7d40-7a32-8f26-84bbad542233",
  type: "page-type/world-derived-metric",
  slug: "tower-of-nimue-hp",
  title: "HP",
  world: "world/tower-of-nimue",
  definition: "the health a climber in the Tower of Nimue has, ten for each point of VIT",
  formula: {},
} as const satisfies WorldDerivedMetric
