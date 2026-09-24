import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFlameResistEpic = {
  id: "01a0d3e8-25a3-7624-83cb-ff55932704d2",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-flame-resist-epic",
  title: "Flame Resist at Epic",
  thing: "temper-jewelry-enchant/flame-resist",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance",
  value: 856,
} as const satisfies TemperGearGrade
