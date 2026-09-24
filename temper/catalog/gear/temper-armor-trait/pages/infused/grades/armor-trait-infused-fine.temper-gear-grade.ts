import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInfusedFine = {
  id: "01a0d3e8-d45d-74c7-b8e4-a65bd9d9a8b7",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-infused-fine",
  title: "Infused at Fine",
  thing: "temper-armor-trait/infused",
  quality: "temper-quality/fine",
  value: 0.13,
} as const satisfies TemperGearGrade
