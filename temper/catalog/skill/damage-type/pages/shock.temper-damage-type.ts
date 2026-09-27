import type { TemperDamageType } from "akasha/temper/catalog/skill/damage-type/temper-damage-type.page-type.types.ts"

export const shock = {
  id: "01a0e2d2-8c72-7b02-8c5a-79e3b9c0b88b",
  type: "page-type/temper-damage-type",
  slug: "shock",
  title: "Shock",
  key: "shock",
  displayOrder: 4,
} as const satisfies TemperDamageType
