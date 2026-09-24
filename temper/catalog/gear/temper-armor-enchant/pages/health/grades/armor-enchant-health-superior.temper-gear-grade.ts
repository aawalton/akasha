import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantHealthSuperior = {
  id: "01a0d3e7-4047-7aae-8dbf-b433985809db",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-health-superior",
  title: "Health at Superior",
  thing: "temper-armor-enchant/health",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 839,
} as const satisfies TemperGearGrade
