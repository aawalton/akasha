import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeGreatswordEpic = {
  id: "01a0e0d2-8814-7975-b7c5-203ec82acbfd",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-greatsword-epic",
  title: "Greatsword at Epic",
  thing: "temper-weapon-type/greatsword",
  quality: "temper-quality/epic",
  value: 1332,
} as const satisfies TemperGearGrade
