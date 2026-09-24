import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFrostResistLegendary = {
  id: "01a0d3e9-05f2-744b-b675-394e87d6c211",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-frost-resist-legendary",
  title: "Frost Resist at Legendary",
  thing: "temper-jewelry-enchant/frost-resist",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance",
  value: 927,
} as const satisfies TemperGearGrade
