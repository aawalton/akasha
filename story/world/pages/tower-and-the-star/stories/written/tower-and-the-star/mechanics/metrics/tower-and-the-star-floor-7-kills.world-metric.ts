import type { WorldMetric } from "akasha/story/world/mechanics/metrics/world-metric.page-type.types.ts"

export const towerAndTheStarFloor7Kills = {
  id: "01a1033f-b3b5-7aec-ae1e-bd7416124cdb",
  type: "page-type/world-metric",
  slug: "tower-and-the-star-floor-7-kills",
  title: "Floor 7 Kills",
  world: "world/tower-and-the-star",
  description: "The party's kill progress on Floor 7.",
  value: 96,
  minValue: 0,
  maxValue: 96,
} as const satisfies WorldMetric
