import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneLegendaryHealthMaximum = {
  id: "01a0d3eb-1b60-7333-a0ae-f4bf6fa663d9",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-legendary-health-maximum",
  title: "Triune at Legendary on Health Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 482,
} as const satisfies TemperGearGrade
