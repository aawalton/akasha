import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeLightningStaffSuperior = {
  id: "01a0e0d2-8814-7794-8b84-a52c93423744",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-lightning-staff-superior",
  title: "Lightning Staff at Superior",
  thing: "temper-weapon-type/lightning-staff",
  quality: "temper-quality/superior",
  value: 1108,
} as const satisfies TemperGearGrade
