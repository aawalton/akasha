import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFlameResistSuperior = {
  id: "01a0d3e8-3f6d-75c1-b352-4ff6c86d7d89",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-flame-resist-superior",
  title: "Flame Resist at Superior",
  thing: "temper-jewelry-enchant/flame-resist",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance",
  value: 805,
} as const satisfies TemperGearGrade
