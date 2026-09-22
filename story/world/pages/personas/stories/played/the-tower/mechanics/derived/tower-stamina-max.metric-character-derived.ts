import type { MetricCharacterDerived } from "akasha/story/mechanic/derived/metric-character-derived.page-type.types.ts"

export const towerStaminaMax = {
  id: "01a0ca36-ec2c-7d9c-b807-01528dfacc3b",
  type: "page-type/metric-character-derived",
  slug: "tower-stamina-max",
  title: "Max Stamina",
  definition: "the most effort a character in the Tower can spend",
  formula: {},
} as const satisfies MetricCharacterDerived
