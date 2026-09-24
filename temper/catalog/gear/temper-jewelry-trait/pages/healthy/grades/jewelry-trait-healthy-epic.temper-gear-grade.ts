import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitHealthyEpic = {
  id: "01a0d3e9-c49b-789e-b5ef-776915329b93",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-healthy-epic",
  title: "Healthy at Epic",
  thing: "temper-jewelry-trait/healthy",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 932,
} as const satisfies TemperGearGrade
