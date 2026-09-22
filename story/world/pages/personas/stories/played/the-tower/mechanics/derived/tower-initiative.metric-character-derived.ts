import type { MetricCharacterDerived } from "akasha/story/mechanic/derived/metric-character-derived.page-type.types.ts"

export const towerInitiative = {
  id: "01a0ca37-a184-7e61-bb46-7d462aeb4320",
  type: "page-type/metric-character-derived",
  slug: "tower-initiative",
  title: "Initiative",
  definition: "how early a character in the Tower acts in a fight",
  formula: {},
} as const satisfies MetricCharacterDerived
