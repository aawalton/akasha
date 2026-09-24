import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantShockResistSuperior = {
  id: "01a0d3ed-09c6-7e36-bb32-857524b01eb4",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-shock-resist-superior",
  title: "Shock Resist at Superior",
  thing: "temper-jewelry-enchant/shock-resist",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance",
  value: 805,
} as const satisfies TemperGearGrade
