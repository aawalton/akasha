import type { TemperEnemyType } from "akasha/temper/catalog/skill/enemy-type/temper-enemy-type.page-type.types.ts"

export const undead = {
  id: "01a0e2d2-d6b3-7566-91b4-30c224f15214",
  type: "page-type/temper-enemy-type",
  slug: "undead",
  title: "Undead",
  key: "undead",
  displayOrder: 1,
} as const satisfies TemperEnemyType
