import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceFeatCostFine = {
  id: "01a0d3ec-1844-7a25-a5f0-3bd5b6760ea7",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-feat-cost-fine",
  title: "Reduce Feat Cost at Fine",
  thing: "temper-jewelry-enchant/reduce-feat-cost",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 167,
} as const satisfies TemperGearGrade
