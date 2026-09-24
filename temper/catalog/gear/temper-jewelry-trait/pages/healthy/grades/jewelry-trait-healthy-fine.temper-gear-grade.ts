import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitHealthyFine = {
  id: "01a0d3ea-0e88-783d-bde8-f7a7704d8221",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-healthy-fine",
  title: "Healthy at Fine",
  thing: "temper-jewelry-trait/healthy",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 877,
} as const satisfies TemperGearGrade
