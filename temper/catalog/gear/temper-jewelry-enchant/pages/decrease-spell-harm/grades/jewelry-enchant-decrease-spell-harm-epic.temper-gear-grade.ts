import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreaseSpellHarmEpic = {
  id: "01a0d3e7-b9b8-724d-afc3-55e851eed35f",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-spell-harm-epic",
  title: "Decrease Spell Harm at Epic",
  thing: "temper-jewelry-enchant/decrease-spell-harm",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance",
  value: 856,
} as const satisfies TemperGearGrade
