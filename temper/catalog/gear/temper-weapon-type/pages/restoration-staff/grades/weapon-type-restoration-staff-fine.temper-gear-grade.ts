import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeRestorationStaffFine = {
  id: "01a0e0d2-8814-7514-ae58-1ee3fe6afb5d",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-restoration-staff-fine",
  title: "Restoration Staff at Fine",
  thing: "temper-weapon-type/restoration-staff",
  quality: "temper-quality/fine",
  value: 1108,
} as const satisfies TemperGearGrade
