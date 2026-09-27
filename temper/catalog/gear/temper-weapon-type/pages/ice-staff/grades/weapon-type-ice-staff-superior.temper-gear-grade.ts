import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeIceStaffSuperior = {
  id: "01a0e0d2-8814-723c-b527-21cde81ad5e4",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-ice-staff-superior",
  title: "Ice Staff at Superior",
  thing: "temper-weapon-type/ice-staff",
  quality: "temper-quality/superior",
  value: 1108,
} as const satisfies TemperGearGrade
