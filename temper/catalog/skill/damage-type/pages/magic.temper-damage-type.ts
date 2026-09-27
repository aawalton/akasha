import type { TemperDamageType } from "akasha/temper/catalog/skill/damage-type/temper-damage-type.page-type.types.ts"

export const magic = {
  id: "01a0e2d2-8c72-7b68-89c8-5164c5a5bc2b",
  type: "page-type/temper-damage-type",
  slug: "magic",
  title: "Magic",
  key: "magic",
  displayOrder: 8,
} as const satisfies TemperDamageType
