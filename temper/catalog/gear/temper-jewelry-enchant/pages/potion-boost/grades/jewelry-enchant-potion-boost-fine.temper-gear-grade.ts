import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionBoostFine = {
  id: "01a0d3ea-b566-71fd-bea5-56d3933aafab",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-boost-fine",
  title: "Potion Boost at Fine",
  thing: "temper-jewelry-enchant/potion-boost",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-potion-duration",
  value: 32,
} as const satisfies TemperGearGrade
