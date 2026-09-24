import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneEpicHealthMaximum = {
  id: "01a0d3ea-f8ba-7357-9006-ff5b0f092334",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-epic-health-maximum",
  title: "Triune at Epic on Health Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 458,
} as const satisfies TemperGearGrade
