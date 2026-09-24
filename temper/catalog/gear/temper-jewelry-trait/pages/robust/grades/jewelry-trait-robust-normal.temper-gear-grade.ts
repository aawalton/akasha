import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitRobustNormal = {
  id: "01a0d3ea-a2c9-7f36-a389-bd1be09c511f",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-robust-normal",
  title: "Robust at Normal",
  thing: "temper-jewelry-trait/robust",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 767,
} as const satisfies TemperGearGrade
