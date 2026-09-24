import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitInfusedNormal = {
  id: "01a0d3ea-48de-7523-8a0d-d66354ce9c40",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-infused-normal",
  title: "Infused at Normal",
  thing: "temper-jewelry-trait/infused",
  quality: "temper-quality/normal",
  value: 0.24,
} as const satisfies TemperGearGrade
