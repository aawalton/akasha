import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaceLegendary = {
  id: "01a0e0d2-8814-7eff-8055-196477b8bd1b",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-mace-legendary",
  title: "Mace at Legendary",
  thing: "temper-weapon-type/mace",
  quality: "temper-quality/legendary",
  value: 1335,
} as const satisfies TemperGearGrade
