import type { MetricDerived } from "akasha/story/mechanic/derived/metric-derived.page-type.types.ts"

export const towerManaMax = {
  id: "01a0ca36-a2a7-7381-a64e-0a6495716083",
  type: "page-type/metric-derived",
  slug: "tower-mana-max",
  title: "Max Mana",
  definition: "the most focus a character in the Tower can hold",
  formula: {},
} as const satisfies MetricDerived
