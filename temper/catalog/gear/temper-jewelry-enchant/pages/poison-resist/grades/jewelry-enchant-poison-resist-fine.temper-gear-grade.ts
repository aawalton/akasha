import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPoisonResistFine = {
  id: "01a0d3ea-8bb2-7ec5-97ce-1796a3af0b11",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-poison-resist-fine",
  title: "Poison Resist at Fine",
  thing: "temper-jewelry-enchant/poison-resist",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance",
  value: 744,
} as const satisfies TemperGearGrade
