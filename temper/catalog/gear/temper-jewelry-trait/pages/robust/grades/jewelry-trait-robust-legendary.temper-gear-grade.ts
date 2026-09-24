import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitRobustLegendary = {
  id: "01a0d3ea-bb78-76a3-9022-cfc5a3f1d341",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-robust-legendary",
  title: "Robust at Legendary",
  thing: "temper-jewelry-trait/robust",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 877,
} as const satisfies TemperGearGrade
