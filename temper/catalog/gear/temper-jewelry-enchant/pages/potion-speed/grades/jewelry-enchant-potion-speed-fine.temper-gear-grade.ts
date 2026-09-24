import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPotionSpeedFine = {
  id: "01a0d3ea-ea33-7e56-8952-4c834f26ba8c",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-potion-speed-fine",
  title: "Potion Speed at Fine",
  thing: "temper-jewelry-enchant/potion-speed",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-potion-cooldown",
  value: -20,
} as const satisfies TemperGearGrade
