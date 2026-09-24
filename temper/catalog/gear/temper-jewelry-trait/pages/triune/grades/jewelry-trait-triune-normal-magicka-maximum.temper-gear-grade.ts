import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneNormalMagickaMaximum = {
  id: "01a0d3eb-73cc-7948-9236-297e88cab208",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-normal-magicka-maximum",
  title: "Triune at Normal on Magicka Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 351,
} as const satisfies TemperGearGrade
