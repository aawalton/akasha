import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneEpicMagickaMaximum = {
  id: "01a0d3eb-23e5-78d8-baa5-15a9ccd87cb2",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-epic-magicka-maximum",
  title: "Triune at Epic on Magicka Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 417,
} as const satisfies TemperGearGrade
