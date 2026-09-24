import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionSpeedLegendary = {
  id: "01a0d3eb-0dba-7453-976d-f4593b1a4aab",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-speed-legendary",
  title: "Potion Speed at Legendary",
  thing: "temper-jewelry-enchant/potion-speed",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-potion-cooldown",
  value: -50,
} as const satisfies TemperGearGrade
