import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitHealthySuperior = {
  id: "01a0d3ea-2069-7bb0-b817-00847e04bd15",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-healthy-superior",
  title: "Healthy at Superior",
  thing: "temper-jewelry-trait/healthy",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 910,
} as const satisfies TemperGearGrade
