import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitNirnhonedFine = {
  id: "01a0d3e9-3dc9-7da7-8c5f-174f9cbcce0e",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-nirnhoned-fine",
  title: "Nirnhoned at Fine",
  thing: "temper-weapon-trait/nirnhoned",
  quality: "temper-quality/fine",
  value: 0.13,
} as const satisfies TemperGearGrade
