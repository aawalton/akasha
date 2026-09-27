import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeLightningStaffNormal = {
  id: "01a0e0d2-8814-7338-8796-63ab31c5ffc7",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-lightning-staff-normal",
  title: "Lightning Staff at Normal",
  thing: "temper-weapon-type/lightning-staff",
  quality: "temper-quality/normal",
  value: 1072,
} as const satisfies TemperGearGrade
