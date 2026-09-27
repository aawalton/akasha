import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeIceStaffNormal = {
  id: "01a0e0d2-8814-7736-8e40-3b9829e585e7",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-ice-staff-normal",
  title: "Ice Staff at Normal",
  thing: "temper-weapon-type/ice-staff",
  quality: "temper-quality/normal",
  value: 1072,
} as const satisfies TemperGearGrade
