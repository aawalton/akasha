import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeDaggerLegendary = {
  id: "01a0e0d2-8814-7458-9076-0f5c6b19f836",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-dagger-legendary",
  title: "Dagger at Legendary",
  thing: "temper-weapon-type/dagger",
  quality: "temper-quality/legendary",
  value: 1335,
} as const satisfies TemperGearGrade
