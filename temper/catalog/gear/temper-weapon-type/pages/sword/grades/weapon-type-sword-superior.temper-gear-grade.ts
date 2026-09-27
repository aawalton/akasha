import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeSwordSuperior = {
  id: "01a0e0d2-8814-7c72-9b43-f0c710708796",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-sword-superior",
  title: "Sword at Superior",
  thing: "temper-weapon-type/sword",
  quality: "temper-quality/superior",
  value: 1108,
} as const satisfies TemperGearGrade
