import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitInfusedFine = {
  id: "01a0d3ea-3755-7726-9ac9-9b2efaa00776",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-infused-fine",
  title: "Infused at Fine",
  thing: "temper-jewelry-trait/infused",
  quality: "temper-quality/fine",
  value: 0.33,
} as const satisfies TemperGearGrade
