import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneNormalStaminaMaximum = {
  id: "01a0d3eb-7ceb-7962-820c-17bc4c5be1ab",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-normal-stamina-maximum",
  title: "Triune at Normal on Stamina Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 351,
} as const satisfies TemperGearGrade
