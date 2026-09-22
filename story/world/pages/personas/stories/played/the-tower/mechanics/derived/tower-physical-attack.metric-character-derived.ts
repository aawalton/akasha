import type { MetricCharacterDerived } from "akasha/story/mechanic/derived/metric-character-derived.page-type.types.ts"

export const towerPhysicalAttack = {
  id: "01a0ca38-0c53-7bd0-83e5-92626d964fcc",
  type: "page-type/metric-character-derived",
  slug: "tower-physical-attack",
  title: "Physical Attack",
  definition: "how hard a character in the Tower strikes with a weapon",
  formula: {},
} as const satisfies MetricCharacterDerived
