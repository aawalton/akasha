import type { TemperEnemyType } from "akasha/temper/catalog/skill/enemy-type/temper-enemy-type.page-type.types.ts"

export const difficultMonster = {
  id: "01a0e2d2-d6b3-70e5-b1a4-96edc07b77a7",
  type: "page-type/temper-enemy-type",
  slug: "difficult-monster",
  title: "Elite Enemy",
  key: "difficult-monster",
  displayOrder: 4,
} as const satisfies TemperEnemyType
