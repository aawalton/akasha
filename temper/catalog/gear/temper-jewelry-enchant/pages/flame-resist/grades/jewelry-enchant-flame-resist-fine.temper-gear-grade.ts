import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFlameResistFine = {
  id: "01a0d3e8-2e42-7422-9608-0ffa24696350",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-flame-resist-fine",
  title: "Flame Resist at Fine",
  thing: "temper-jewelry-enchant/flame-resist",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance",
  value: 744,
} as const satisfies TemperGearGrade
