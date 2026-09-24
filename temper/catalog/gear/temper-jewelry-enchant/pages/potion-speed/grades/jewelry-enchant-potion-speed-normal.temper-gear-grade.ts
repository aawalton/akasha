import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionSpeedNormal = {
  id: "01a0d3ea-f252-79bd-8b06-45fa8755d4a6",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-speed-normal",
  title: "Potion Speed at Normal",
  thing: "temper-jewelry-enchant/potion-speed",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-potion-cooldown",
  value: -10,
} as const satisfies TemperGearGrade
