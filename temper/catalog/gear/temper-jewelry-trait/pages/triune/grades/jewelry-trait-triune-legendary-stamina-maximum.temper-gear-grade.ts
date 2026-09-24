import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneLegendaryStaminaMaximum = {
  id: "01a0d3eb-ab02-7a86-b4a4-be0695edd7ee",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-legendary-stamina-maximum",
  title: "Triune at Legendary on Stamina Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 439,
} as const satisfies TemperGearGrade
