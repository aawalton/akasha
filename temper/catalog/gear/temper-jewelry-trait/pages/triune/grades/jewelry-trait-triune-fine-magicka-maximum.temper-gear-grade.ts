import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneFineMagickaMaximum = {
  id: "01a0d3eb-6298-75a0-9099-9c957b8a2ec4",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-fine-magicka-maximum",
  title: "Triune at Fine on Magicka Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 373,
} as const satisfies TemperGearGrade
