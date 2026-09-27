import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeMaceSuperior = {
  id: "01a0e0d2-8814-70b3-8e06-7b16900626d4",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-mace-superior",
  title: "Mace at Superior",
  thing: "temper-weapon-type/mace",
  quality: "temper-quality/superior",
  value: 1108,
} as const satisfies TemperGearGrade
