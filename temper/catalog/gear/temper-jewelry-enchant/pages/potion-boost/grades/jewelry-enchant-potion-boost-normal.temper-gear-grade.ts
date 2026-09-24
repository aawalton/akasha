import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionBoostNormal = {
  id: "01a0d3ea-c74e-769e-9acb-23712f873c6b",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-boost-normal",
  title: "Potion Boost at Normal",
  thing: "temper-jewelry-enchant/potion-boost",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-potion-duration",
  value: 31,
} as const satisfies TemperGearGrade
