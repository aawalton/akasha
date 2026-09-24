import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitArcaneLegendary = {
  id: "01a0d3e9-5991-7708-9046-785c2ce206c2",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-arcane-legendary",
  title: "Arcane at Legendary",
  thing: "temper-jewelry-trait/arcane",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 877,
} as const satisfies TemperGearGrade
