import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeBowLegendary = {
  id: "01a0e0d2-8814-7255-913d-18c63c465c67",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-bow-legendary",
  title: "Bow at Legendary",
  thing: "temper-weapon-type/bow",
  quality: "temper-quality/legendary",
  value: 1335,
} as const satisfies TemperGearGrade
