import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFrostResistEpic = {
  id: "01a0d3e8-e2d7-7a36-a149-fef2a5159957",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-frost-resist-epic",
  title: "Frost Resist at Epic",
  thing: "temper-jewelry-enchant/frost-resist",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance",
  value: 856,
} as const satisfies TemperGearGrade
