import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitInfusedSuperior = {
  id: "01a0d3ea-518d-730d-b98e-c5257134e455",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-infused-superior",
  title: "Infused at Superior",
  thing: "temper-jewelry-trait/infused",
  quality: "temper-quality/superior",
  value: 0.42,
} as const satisfies TemperGearGrade
