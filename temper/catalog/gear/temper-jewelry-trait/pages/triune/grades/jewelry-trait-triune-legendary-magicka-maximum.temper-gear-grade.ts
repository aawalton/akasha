import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneLegendaryMagickaMaximum = {
  id: "01a0d3eb-a288-79b3-b748-16e362ce313f",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-legendary-magicka-maximum",
  title: "Triune at Legendary on Magicka Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 439,
} as const satisfies TemperGearGrade
