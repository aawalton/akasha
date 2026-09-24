import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantStaminaNormal = {
  id: "01a0d3e8-316f-79f8-9a2e-4cdacee3e924",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-stamina-normal",
  title: "Stamina at Normal",
  thing: "temper-armor-enchant/stamina",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 668,
} as const satisfies TemperGearGrade
