import type { TemperEnemyType } from "akasha/temper/catalog/skill/enemy-type/temper-enemy-type.page-type.types.ts"

export const werewolf = {
  id: "01a0e2d2-d6b3-7fca-b61e-0231a85a06b0",
  type: "page-type/temper-enemy-type",
  slug: "werewolf",
  title: "Werewolf",
  key: "werewolf",
  displayOrder: 3,
} as const satisfies TemperEnemyType
