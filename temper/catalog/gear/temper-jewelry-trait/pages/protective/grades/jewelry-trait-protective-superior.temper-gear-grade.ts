import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitProtectiveSuperior = {
  id: "01a0d3ea-818e-7048-9b6f-2b83126cd17a",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-protective-superior",
  title: "Protective at Superior",
  thing: "temper-jewelry-trait/protective",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance",
  value: 1744,
} as const satisfies TemperGearGrade
