import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionBoostEpic = {
  id: "01a0d3ea-aceb-7b9c-b8ef-89665f038170",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-boost-epic",
  title: "Potion Boost at Epic",
  thing: "temper-jewelry-enchant/potion-boost",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-potion-duration",
  value: 35,
} as const satisfies TemperGearGrade
