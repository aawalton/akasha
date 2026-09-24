import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantHealthFine = {
  id: "01a0d3e7-26a0-7b2c-971c-3bcfc8f0f355",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-health-fine",
  title: "Health at Fine",
  thing: "temper-armor-enchant/health",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 774,
} as const satisfies TemperGearGrade
