import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeDaggerSuperior = {
  id: "01a0e0d2-8814-7f80-960c-3cc00ad67eb6",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-dagger-superior",
  title: "Dagger at Superior",
  thing: "temper-weapon-type/dagger",
  quality: "temper-quality/superior",
  value: 1108,
} as const satisfies TemperGearGrade
