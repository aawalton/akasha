import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeLightningStaffEpic = {
  id: "01a0e0d2-8814-7b54-b9de-0e24615adc8d",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-lightning-staff-epic",
  title: "Lightning Staff at Epic",
  thing: "temper-weapon-type/lightning-staff",
  quality: "temper-quality/epic",
  value: 1132,
} as const satisfies TemperGearGrade
