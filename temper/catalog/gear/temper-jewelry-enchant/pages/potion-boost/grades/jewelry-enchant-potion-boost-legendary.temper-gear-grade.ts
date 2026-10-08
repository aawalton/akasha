import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionBoostLegendary = {
  id: "01a0d3ea-d862-7482-9728-341e7813ce9c",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-boost-legendary",
  title: "Potion Boost at Legendary",
  thing: "temper-jewelry-enchant/potion-boost",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-potion-duration",
  value: 36,
  createdAt: "2026-09-24T14:56:18.530Z",
  updatedAt: "2026-09-24T14:57:17.000Z",
} as const satisfies TemperGearGrade
