import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitRobustFine = {
  id: "01a0d3ea-9b37-752d-9e56-c25ee0141ac3",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-robust-fine",
  title: "Robust at Fine",
  thing: "temper-jewelry-trait/robust",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 797,
} as const satisfies TemperGearGrade
