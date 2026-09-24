import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantHealthEpic = {
  id: "01a0d3e7-15b0-7315-9e35-2d67467cf8f0",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-health-epic",
  title: "Health at Epic",
  thing: "temper-armor-enchant/health",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 882,
} as const satisfies TemperGearGrade
