import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneEpicStaminaMaximum = {
  id: "01a0d3eb-59ca-75b0-8992-993c74ac8e87",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-epic-stamina-maximum",
  title: "Triune at Epic on Stamina Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 417,
} as const satisfies TemperGearGrade
