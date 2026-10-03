import type { WorldMetric } from "akasha/story/world/mechanics/metrics/world-metric.page-type.types.ts"

export const towerAndTheStarHighestFloorCleared = {
  id: "01a1033f-b3b5-77c1-a4bd-9a421fd490ea",
  type: "page-type/world-metric",
  slug: "tower-and-the-star-highest-floor-cleared",
  title: "Highest Floor Cleared",
  world: "world/tower-and-the-star",
  description: "The highest Tower floor the party has cleared.",
  value: 30,
  minValue: 0,
} as const satisfies WorldMetric
