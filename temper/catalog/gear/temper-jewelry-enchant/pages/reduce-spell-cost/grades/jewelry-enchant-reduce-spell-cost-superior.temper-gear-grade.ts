import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSpellCostSuperior = {
  id: "01a0d3ec-d476-7092-89a9-05f62a0bf17d",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-spell-cost-superior",
  title: "Reduce Spell Cost at Superior",
  thing: "temper-jewelry-enchant/reduce-spell-cost",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 179,
  createdAt: "2026-09-24T14:58:28.598Z",
  updatedAt: "2026-09-24T14:58:51.000Z",
} as const satisfies TemperGearGrade
