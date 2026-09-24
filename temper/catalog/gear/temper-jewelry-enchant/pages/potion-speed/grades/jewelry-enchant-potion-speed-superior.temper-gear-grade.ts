import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionSpeedSuperior = {
  id: "01a0d3eb-05ae-7926-ac23-d2f3db5aa102",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-speed-superior",
  title: "Potion Speed at Superior",
  thing: "temper-jewelry-enchant/potion-speed",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-potion-cooldown",
  value: -30,
} as const satisfies TemperGearGrade
