import type { WorldMetric } from "akasha/story/world/mechanics/metrics/world-metric.page-type.types.ts"

export const towerAndTheStarHighestFloorReached = {
  id: "01a1033f-b3b5-77ba-b2c8-8ed1b518d9a2",
  type: "page-type/world-metric",
  slug: "tower-and-the-star-highest-floor-reached",
  title: "Highest Floor Reached",
  world: "world/tower-and-the-star",
  description: "The highest Tower floor the party has reached.",
  value: 32,
  minValue: 1,
} as const satisfies WorldMetric
