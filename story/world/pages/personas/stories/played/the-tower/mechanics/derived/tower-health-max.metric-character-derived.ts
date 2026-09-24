import type { MetricCharacterDerived } from "akasha/story/mechanic/derived/metric-character-derived.page-type.types.ts"

export const towerHealthMax = {
  id: "01a0ca34-6ce1-7b83-ba1b-68a26a42eba4",
  type: "page-type/metric-character-derived",
  slug: "tower-health-max",
  title: "Max Health",
  definition: "the most health a character in the Tower can have",
  formula: {},
} as const satisfies MetricCharacterDerived
