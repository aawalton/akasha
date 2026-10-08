import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSpellCostNormal = {
  id: "01a0d3ec-cb30-7bac-872f-42691c3cd964",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-spell-cost-normal",
  title: "Reduce Spell Cost at Normal",
  thing: "temper-jewelry-enchant/reduce-spell-cost",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 154,
  createdAt: "2026-09-24T14:58:26.224Z",
  updatedAt: "2026-09-24T14:58:51.000Z",
} as const satisfies TemperGearGrade
