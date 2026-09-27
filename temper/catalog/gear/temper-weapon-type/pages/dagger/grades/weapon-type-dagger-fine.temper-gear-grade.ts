import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeDaggerFine = {
  id: "01a0e0d2-8814-725c-a366-9fc6c6fa3fd3",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-dagger-fine",
  title: "Dagger at Fine",
  thing: "temper-weapon-type/dagger",
  quality: "temper-quality/fine",
  value: 1108,
} as const satisfies TemperGearGrade
