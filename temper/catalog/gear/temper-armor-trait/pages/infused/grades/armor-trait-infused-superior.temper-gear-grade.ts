import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInfusedSuperior = {
  id: "01a0d3e8-e1e2-7fb5-bb11-5ad3888e70c5",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-infused-superior",
  title: "Infused at Superior",
  thing: "temper-armor-trait/infused",
  quality: "temper-quality/superior",
  value: 0.17,
} as const satisfies TemperGearGrade
