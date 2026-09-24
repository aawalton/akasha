import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitNirnhonedLegendary = {
  id: "01a0d3e9-5f61-744a-a7bb-c44b7ef0fb3d",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-nirnhoned-legendary",
  title: "Nirnhoned at Legendary",
  thing: "temper-weapon-trait/nirnhoned",
  quality: "temper-quality/legendary",
  value: 0.15,
} as const satisfies TemperGearGrade
