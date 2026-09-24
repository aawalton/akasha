import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionBoostSuperior = {
  id: "01a0d3ea-cfd7-782b-b086-f16634182c43",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-boost-superior",
  title: "Potion Boost at Superior",
  thing: "temper-jewelry-enchant/potion-boost",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-potion-duration",
  value: 33,
} as const satisfies TemperGearGrade
