import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPoisonResistEpic = {
  id: "01a0d3ea-786a-75d4-9e9b-b4e4615d7720",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-poison-resist-epic",
  title: "Poison Resist at Epic",
  thing: "temper-jewelry-enchant/poison-resist",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance",
  value: 856,
} as const satisfies TemperGearGrade
