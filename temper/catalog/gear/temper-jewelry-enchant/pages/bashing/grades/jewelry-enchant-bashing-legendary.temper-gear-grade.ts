import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBashingLegendary = {
  id: "01a0d3e7-4761-7b73-bd47-5a79d5014c5b",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bashing-legendary",
  title: "Bashing at Legendary",
  thing: "temper-jewelry-enchant/bashing",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-bash-damage",
  value: 500,
} as const satisfies TemperGearGrade
