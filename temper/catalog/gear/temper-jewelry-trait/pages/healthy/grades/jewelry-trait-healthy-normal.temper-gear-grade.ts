import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitHealthyNormal = {
  id: "01a0d3ea-1796-7cf1-93a1-84369c39c404",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-healthy-normal",
  title: "Healthy at Normal",
  thing: "temper-jewelry-trait/healthy",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 844,
} as const satisfies TemperGearGrade
