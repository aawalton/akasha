import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitInfusedLegendary = {
  id: "01a0d3ea-5834-7c97-baaf-311af757b38e",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-infused-legendary",
  title: "Infused at Legendary",
  thing: "temper-jewelry-trait/infused",
  quality: "temper-quality/legendary",
  value: 0.6,
} as const satisfies TemperGearGrade
