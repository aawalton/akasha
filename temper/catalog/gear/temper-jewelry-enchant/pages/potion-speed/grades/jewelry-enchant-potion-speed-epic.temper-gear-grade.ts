import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionSpeedEpic = {
  id: "01a0d3ea-e0f4-73d0-bb51-05fb432fe10f",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-speed-epic",
  title: "Potion Speed at Epic",
  thing: "temper-jewelry-enchant/potion-speed",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-potion-cooldown",
  value: -40,
} as const satisfies TemperGearGrade
