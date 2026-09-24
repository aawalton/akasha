import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFlameResistLegendary = {
  id: "01a0d3e8-47ee-796d-8460-909a319fc1cc",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-flame-resist-legendary",
  title: "Flame Resist at Legendary",
  thing: "temper-jewelry-enchant/flame-resist",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance",
  value: 927,
} as const satisfies TemperGearGrade
