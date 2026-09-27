import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeDaggerEpic = {
  id: "01a0e0d2-8814-7c9f-934f-04f98bdf8624",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-dagger-epic",
  title: "Dagger at Epic",
  thing: "temper-weapon-type/dagger",
  quality: "temper-quality/epic",
  value: 1132,
} as const satisfies TemperGearGrade
