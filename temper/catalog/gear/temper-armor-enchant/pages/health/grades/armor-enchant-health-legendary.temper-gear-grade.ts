import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantHealthLegendary = {
  id: "01a0d3e7-48f3-7777-8230-05f9d6237374",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-health-legendary",
  title: "Health at Legendary",
  thing: "temper-armor-enchant/health",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 954,
} as const satisfies TemperGearGrade
