import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeIceStaffLegendary = {
  id: "01a0e0d2-8814-7a02-95fb-30d862238280",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-ice-staff-legendary",
  title: "Ice Staff at Legendary",
  thing: "temper-weapon-type/ice-staff",
  quality: "temper-quality/legendary",
  value: 1335,
} as const satisfies TemperGearGrade
