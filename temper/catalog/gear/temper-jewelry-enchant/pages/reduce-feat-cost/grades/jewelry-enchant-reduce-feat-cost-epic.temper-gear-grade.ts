import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceFeatCostEpic = {
  id: "01a0d3ec-05f0-7962-a415-beb588e29ef9",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-feat-cost-epic",
  title: "Reduce Feat Cost at Epic",
  thing: "temper-jewelry-enchant/reduce-feat-cost",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 191,
} as const satisfies TemperGearGrade
