import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneSuperiorStaminaMaximum = {
  id: "01a0d3eb-9a17-70f5-a2f0-5b56582761fe",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-superior-stamina-maximum",
  title: "Triune at Superior on Stamina Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 395,
} as const satisfies TemperGearGrade
