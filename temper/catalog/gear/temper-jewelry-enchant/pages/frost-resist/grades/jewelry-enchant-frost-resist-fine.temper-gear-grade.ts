import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFrostResistFine = {
  id: "01a0d3e8-ecfc-7782-8bae-895621b7e111",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-frost-resist-fine",
  title: "Frost Resist at Fine",
  thing: "temper-jewelry-enchant/frost-resist",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance",
  value: 744,
} as const satisfies TemperGearGrade
