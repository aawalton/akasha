import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneSuperiorMagickaMaximum = {
  id: "01a0d3eb-85f9-7c40-8585-61d8e67c1e69",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-superior-magicka-maximum",
  title: "Triune at Superior on Magicka Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 395,
} as const satisfies TemperGearGrade
