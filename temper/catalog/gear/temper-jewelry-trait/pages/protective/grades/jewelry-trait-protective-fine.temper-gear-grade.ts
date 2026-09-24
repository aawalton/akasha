import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitProtectiveFine = {
  id: "01a0d3ea-698e-769a-8864-085c5e21172d",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-protective-fine",
  title: "Protective at Fine",
  thing: "temper-jewelry-trait/protective",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance",
  value: 1664,
} as const satisfies TemperGearGrade
