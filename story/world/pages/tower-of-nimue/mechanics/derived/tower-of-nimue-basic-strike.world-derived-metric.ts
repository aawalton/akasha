import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const towerOfNimueBasicStrike = {
  id: "01a0deea-7d3f-7f79-95d3-ccc13ce68ced",
  type: "page-type/world-derived-metric",
  slug: "tower-of-nimue-basic-strike",
  title: "Basic Strike",
  world: "world/tower-of-nimue",
  definition: "the damage a basic strike deals in the Tower of Nimue, two for each point of PWR",
  formula: {},
} as const satisfies WorldDerivedMetric
