import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeRestorationStaffEpic = {
  id: "01a0e0d2-8814-7b7e-9eac-fab57afe32bd",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-restoration-staff-epic",
  title: "Restoration Staff at Epic",
  thing: "temper-weapon-type/restoration-staff",
  quality: "temper-quality/epic",
  value: 1132,
} as const satisfies TemperGearGrade
