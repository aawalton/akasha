import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitRobustSuperior = {
  id: "01a0d3ea-ab22-7390-894b-ec006a3f28c4",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-robust-superior",
  title: "Robust at Superior",
  thing: "temper-jewelry-trait/robust",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 827,
} as const satisfies TemperGearGrade
