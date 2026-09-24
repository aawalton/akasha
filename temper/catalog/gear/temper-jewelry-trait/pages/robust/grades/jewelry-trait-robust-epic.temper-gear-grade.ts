import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitRobustEpic = {
  id: "01a0d3ea-9280-718b-933a-83f7199f9eee",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-robust-epic",
  title: "Robust at Epic",
  thing: "temper-jewelry-trait/robust",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 847,
} as const satisfies TemperGearGrade
