import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneFineStaminaMaximum = {
  id: "01a0d3eb-6b37-7b01-9ec4-d975d0d086ad",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-fine-stamina-maximum",
  title: "Triune at Fine on Stamina Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 373,
} as const satisfies TemperGearGrade
