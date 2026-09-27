import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeRestorationStaffSuperior = {
  id: "01a0e0d2-8814-7cd3-995a-44a9242cebee",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-restoration-staff-superior",
  title: "Restoration Staff at Superior",
  thing: "temper-weapon-type/restoration-staff",
  quality: "temper-quality/superior",
  value: 1108,
} as const satisfies TemperGearGrade
