import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreaseSpellHarmLegendary = {
  id: "01a0d3e7-e7f6-7d9c-895c-a75070ffc6c0",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-spell-harm-legendary",
  title: "Decrease Spell Harm at Legendary",
  thing: "temper-jewelry-enchant/decrease-spell-harm",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance",
  value: 927,
} as const satisfies TemperGearGrade
