import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInfusedLegendary = {
  id: "01a0d3e8-e969-78f0-9c00-afded9e79d9e",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-infused-legendary",
  title: "Infused at Legendary",
  thing: "temper-armor-trait/infused",
  quality: "temper-quality/legendary",
  value: 0.25,
} as const satisfies TemperGearGrade
