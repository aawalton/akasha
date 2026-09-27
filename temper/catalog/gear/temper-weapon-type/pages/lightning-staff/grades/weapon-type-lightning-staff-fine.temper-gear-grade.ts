import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeLightningStaffFine = {
  id: "01a0e0d2-8814-70e6-844d-de5455b24a37",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-lightning-staff-fine",
  title: "Lightning Staff at Fine",
  thing: "temper-weapon-type/lightning-staff",
  quality: "temper-quality/fine",
  value: 1108,
} as const satisfies TemperGearGrade
