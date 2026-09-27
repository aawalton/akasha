import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeRestorationStaffNormal = {
  id: "01a0e0d2-8814-7c02-bb8b-1322f0829aa4",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-restoration-staff-normal",
  title: "Restoration Staff at Normal",
  thing: "temper-weapon-type/restoration-staff",
  quality: "temper-quality/normal",
  value: 1072,
} as const satisfies TemperGearGrade
