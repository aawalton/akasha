import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeRestorationStaffLegendary = {
  id: "01a0e0d2-8814-7674-82be-dea395435a03",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-restoration-staff-legendary",
  title: "Restoration Staff at Legendary",
  thing: "temper-weapon-type/restoration-staff",
  quality: "temper-quality/legendary",
  value: 1335,
} as const satisfies TemperGearGrade
