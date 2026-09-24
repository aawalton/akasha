import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantShockResistFine = {
  id: "01a0d3ec-f83e-75f1-b21e-6ee9cbe168e1",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-shock-resist-fine",
  title: "Shock Resist at Fine",
  thing: "temper-jewelry-enchant/shock-resist",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance",
  value: 744,
} as const satisfies TemperGearGrade
