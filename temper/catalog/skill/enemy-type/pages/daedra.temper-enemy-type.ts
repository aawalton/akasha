import type { TemperEnemyType } from "akasha/temper/catalog/skill/enemy-type/temper-enemy-type.page-type.types.ts"

export const daedra = {
  id: "01a0e2d2-d6b2-7087-916e-8696aa22cae2",
  type: "page-type/temper-enemy-type",
  slug: "daedra",
  title: "Daedra",
  key: "daedra",
  displayOrder: 2,
} as const satisfies TemperEnemyType
