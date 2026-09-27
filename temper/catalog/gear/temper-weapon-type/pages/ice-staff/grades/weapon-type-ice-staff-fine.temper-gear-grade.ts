import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeIceStaffFine = {
  id: "01a0e0d2-8814-7793-a355-47f8de62ccb7",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-ice-staff-fine",
  title: "Ice Staff at Fine",
  thing: "temper-weapon-type/ice-staff",
  quality: "temper-quality/fine",
  value: 1108,
} as const satisfies TemperGearGrade
