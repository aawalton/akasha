import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitHealthyLegendary = {
  id: "01a0d3ea-292e-7b88-a0d0-7dc99e433267",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-healthy-legendary",
  title: "Healthy at Legendary",
  thing: "temper-jewelry-trait/healthy",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 965,
} as const satisfies TemperGearGrade
