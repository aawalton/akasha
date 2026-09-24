import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFrostResistSuperior = {
  id: "01a0d3e8-fd20-7b14-8bd4-6ac6d5c9c023",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-frost-resist-superior",
  title: "Frost Resist at Superior",
  thing: "temper-jewelry-enchant/frost-resist",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance",
  value: 805,
} as const satisfies TemperGearGrade
