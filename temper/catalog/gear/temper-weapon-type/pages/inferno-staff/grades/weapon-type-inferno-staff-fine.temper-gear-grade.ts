import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeInfernoStaffFine = {
  id: "01a0e0d2-8814-7b7b-be0b-ff2343597f07",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-inferno-staff-fine",
  title: "Inferno Staff at Fine",
  thing: "temper-weapon-type/inferno-staff",
  quality: "temper-quality/fine",
  value: 1108,
} as const satisfies TemperGearGrade
