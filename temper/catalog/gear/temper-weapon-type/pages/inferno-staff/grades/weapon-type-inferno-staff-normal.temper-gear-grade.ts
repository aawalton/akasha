import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeInfernoStaffNormal = {
  id: "01a0e0d2-8814-7686-8ed1-bca510fc7fb7",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-inferno-staff-normal",
  title: "Inferno Staff at Normal",
  thing: "temper-weapon-type/inferno-staff",
  quality: "temper-quality/normal",
  value: 1072,
} as const satisfies TemperGearGrade
