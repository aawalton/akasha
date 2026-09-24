import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitProtectiveEpic = {
  id: "01a0d3ea-60ec-7552-867d-ae0f0617d189",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-protective-epic",
  title: "Protective at Epic",
  thing: "temper-jewelry-trait/protective",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance",
  value: 1804,
} as const satisfies TemperGearGrade
