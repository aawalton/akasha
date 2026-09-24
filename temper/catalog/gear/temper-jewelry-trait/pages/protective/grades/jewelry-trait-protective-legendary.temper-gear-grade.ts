import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitProtectiveLegendary = {
  id: "01a0d3ea-89e2-7d57-8f1e-f8b5028e5c1b",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-protective-legendary",
  title: "Protective at Legendary",
  thing: "temper-jewelry-trait/protective",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance",
  value: 1844,
} as const satisfies TemperGearGrade
