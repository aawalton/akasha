import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const towerInitiative = {
  id: "01a0ca37-a184-7e61-bb46-7d462aeb4320",
  type: "page-type/world-derived-metric",
  slug: "tower-initiative",
  title: "Initiative",
  definition: "how early a character in the Tower acts in a fight",
  formula: {},
} as const satisfies WorldDerivedMetric
