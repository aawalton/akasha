import type { MetricCharacterDerived } from "akasha/story/mechanic/derived/metric-character-derived.page-type.types.ts"

export const towerMentalAttack = {
  id: "01a0ca38-a872-74c1-86d8-b48557958750",
  type: "page-type/metric-character-derived",
  slug: "tower-mental-attack",
  title: "Mental Attack",
  definition: "how hard a character in the Tower presses on another mind",
  formula: {},
} as const satisfies MetricCharacterDerived
