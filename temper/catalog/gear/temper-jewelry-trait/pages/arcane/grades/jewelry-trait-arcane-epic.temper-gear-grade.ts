import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitArcaneEpic = {
  id: "01a0d3e9-2dec-7e31-a200-e07613d6f115",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-arcane-epic",
  title: "Arcane at Epic",
  thing: "temper-jewelry-trait/arcane",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 847,
} as const satisfies TemperGearGrade
