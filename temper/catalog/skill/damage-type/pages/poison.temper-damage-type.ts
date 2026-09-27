import type { TemperDamageType } from "akasha/temper/catalog/skill/damage-type/temper-damage-type.page-type.types.ts"

export const poison = {
  id: "01a0e2d2-8c72-7b7e-b234-f75b1407e849",
  type: "page-type/temper-damage-type",
  slug: "poison",
  title: "Poison",
  key: "poison",
  displayOrder: 11,
} as const satisfies TemperDamageType
