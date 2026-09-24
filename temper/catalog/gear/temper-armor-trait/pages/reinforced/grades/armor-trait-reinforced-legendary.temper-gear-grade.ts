import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitReinforcedLegendary = {
  id: "01a0d3e9-fe41-796d-aea5-1e0fda2d5c0f",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-reinforced-legendary",
  title: "Reinforced at Legendary",
  thing: "temper-armor-trait/reinforced",
  quality: "temper-quality/legendary",
  value: 0.16,
} as const satisfies TemperGearGrade
