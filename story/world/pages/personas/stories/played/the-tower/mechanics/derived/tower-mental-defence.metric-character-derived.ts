import type { MetricCharacterDerived } from "akasha/story/mechanic/derived/metric-character-derived.page-type.types.ts"

export const towerMentalDefence = {
  id: "01a0ca38-f12f-71ed-b5af-bc32540a9269",
  type: "page-type/metric-character-derived",
  slug: "tower-mental-defence",
  title: "Mental Defence",
  definition: "how well a character in the Tower holds its own mind",
  formula: {},
} as const satisfies MetricCharacterDerived
