import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneSuperiorHealthMaximum = {
  id: "01a0d3eb-12da-742f-8378-c3586988948e",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-superior-health-maximum",
  title: "Triune at Superior on Health Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 434,
} as const satisfies TemperGearGrade
