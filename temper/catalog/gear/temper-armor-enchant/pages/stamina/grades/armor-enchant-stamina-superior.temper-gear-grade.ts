import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantStaminaSuperior = {
  id: "01a0d3e8-39e2-7f5c-a5d7-57f84ace5579",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-stamina-superior",
  title: "Stamina at Superior",
  thing: "temper-armor-enchant/stamina",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 763,
} as const satisfies TemperGearGrade
