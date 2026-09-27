import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeIceStaffEpic = {
  id: "01a0e0d2-8814-7ff9-83b4-d3ccb4aaf879",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-ice-staff-epic",
  title: "Ice Staff at Epic",
  thing: "temper-weapon-type/ice-staff",
  quality: "temper-quality/epic",
  value: 1132,
} as const satisfies TemperGearGrade
