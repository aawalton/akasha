import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeInfernoStaffSuperior = {
  id: "01a0e0d2-8814-73f3-b660-1a403ceb9eb2",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-inferno-staff-superior",
  title: "Inferno Staff at Superior",
  thing: "temper-weapon-type/inferno-staff",
  quality: "temper-quality/superior",
  value: 1108,
} as const satisfies TemperGearGrade
