import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitNirnhonedSuperior = {
  id: "01a0d3e9-56a2-71fb-9581-12d1e1a392fb",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-nirnhoned-superior",
  title: "Nirnhoned at Superior",
  thing: "temper-weapon-trait/nirnhoned",
  quality: "temper-quality/superior",
  value: 0.13,
} as const satisfies TemperGearGrade
