import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeGreatswordSuperior = {
  id: "01a0e0d2-8814-7884-9215-a8b301fd223b",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-greatsword-superior",
  title: "Greatsword at Superior",
  thing: "temper-weapon-type/greatsword",
  quality: "temper-quality/superior",
  value: 1304,
} as const satisfies TemperGearGrade
