import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeInfernoStaffEpic = {
  id: "01a0e0d2-8814-76bf-8eb4-d5abc58621a7",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-inferno-staff-epic",
  title: "Inferno Staff at Epic",
  thing: "temper-weapon-type/inferno-staff",
  quality: "temper-quality/epic",
  value: 1132,
} as const satisfies TemperGearGrade
