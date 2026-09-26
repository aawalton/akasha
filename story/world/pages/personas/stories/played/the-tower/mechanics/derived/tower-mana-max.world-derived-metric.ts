import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const towerManaMax = {
  id: "01a0ca36-a2a7-7381-a64e-0a6495716083",
  type: "page-type/world-derived-metric",
  slug: "tower-mana-max",
  title: "Max Mana",
  definition: "the most mana a character in the Tower can hold",
  formula: {},
} as const satisfies WorldDerivedMetric
