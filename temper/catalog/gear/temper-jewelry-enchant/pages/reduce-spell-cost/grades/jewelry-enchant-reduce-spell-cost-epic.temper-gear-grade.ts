import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSpellCostEpic = {
  id: "01a0d3ec-b938-7d27-8b48-46b17a9de9f4",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-spell-cost-epic",
  title: "Reduce Spell Cost at Epic",
  thing: "temper-jewelry-enchant/reduce-spell-cost",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 191,
} as const satisfies TemperGearGrade
