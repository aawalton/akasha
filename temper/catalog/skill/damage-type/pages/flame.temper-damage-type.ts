import type { TemperDamageType } from "akasha/temper/catalog/skill/damage-type/temper-damage-type.page-type.types.ts"

export const flame = {
  id: "01a0e2d2-8c72-7833-9991-f01da365e261",
  type: "page-type/temper-damage-type",
  slug: "flame",
  title: "Flame",
  key: "flame",
  displayOrder: 3,
} as const satisfies TemperDamageType
