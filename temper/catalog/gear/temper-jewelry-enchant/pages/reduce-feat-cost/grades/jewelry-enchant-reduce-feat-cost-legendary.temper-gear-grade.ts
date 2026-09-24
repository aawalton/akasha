import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceFeatCostLegendary = {
  id: "01a0d3ec-3317-765a-972f-a9c5d6ea437a",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-feat-cost-legendary",
  title: "Reduce Feat Cost at Legendary",
  thing: "temper-jewelry-enchant/reduce-feat-cost",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 203,
} as const satisfies TemperGearGrade
