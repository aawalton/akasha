import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeDaggerNormal = {
  id: "01a0e0d2-8814-7d1a-8498-7a28668f4ba6",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-dagger-normal",
  title: "Dagger at Normal",
  thing: "temper-weapon-type/dagger",
  quality: "temper-quality/normal",
  value: 1072,
} as const satisfies TemperGearGrade
