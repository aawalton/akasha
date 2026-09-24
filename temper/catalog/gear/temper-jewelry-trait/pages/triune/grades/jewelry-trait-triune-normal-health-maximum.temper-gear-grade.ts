import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneNormalHealthMaximum = {
  id: "01a0d3eb-0a28-7ad9-9697-feefdc03b9fc",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-normal-health-maximum",
  title: "Triune at Normal on Health Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 386,
} as const satisfies TemperGearGrade
