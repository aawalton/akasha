import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitNirnhonedLegendary = {
  id: "01a0d3e9-cd40-787c-b2e2-be1543455bf7",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-nirnhoned-legendary",
  title: "Nirnhoned at Legendary",
  thing: "temper-armor-trait/nirnhoned",
  quality: "temper-quality/legendary",
  value: 253,
} as const satisfies TemperGearGrade
