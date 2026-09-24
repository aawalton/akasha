import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreaseSpellHarmNormal = {
  id: "01a0d3e7-cbde-7096-b311-983a8b6f020b",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-spell-harm-normal",
  title: "Decrease Spell Harm at Normal",
  thing: "temper-jewelry-enchant/decrease-spell-harm",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance",
  value: 713,
} as const satisfies TemperGearGrade
