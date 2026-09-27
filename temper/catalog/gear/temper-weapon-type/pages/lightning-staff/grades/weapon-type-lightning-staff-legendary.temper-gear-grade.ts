import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeLightningStaffLegendary = {
  id: "01a0e0d2-8814-7b80-b156-cd1fc69255bd",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-lightning-staff-legendary",
  title: "Lightning Staff at Legendary",
  thing: "temper-weapon-type/lightning-staff",
  quality: "temper-quality/legendary",
  value: 1335,
} as const satisfies TemperGearGrade
