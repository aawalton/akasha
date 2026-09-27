import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeInfernoStaffLegendary = {
  id: "01a0e0d2-8814-7d4f-af26-0f53d1ebd053",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-inferno-staff-legendary",
  title: "Inferno Staff at Legendary",
  thing: "temper-weapon-type/inferno-staff",
  quality: "temper-quality/legendary",
  value: 1335,
} as const satisfies TemperGearGrade
