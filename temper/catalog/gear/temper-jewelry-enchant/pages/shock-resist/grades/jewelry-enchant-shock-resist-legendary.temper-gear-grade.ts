import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantShockResistLegendary = {
  id: "01a0d3ed-1367-719e-bd94-02f8fdfdb659",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-shock-resist-legendary",
  title: "Shock Resist at Legendary",
  thing: "temper-jewelry-enchant/shock-resist",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance",
  value: 927,
} as const satisfies TemperGearGrade
