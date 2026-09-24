import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantHealthNormal = {
  id: "01a0d3e7-3776-7035-bcb3-fc085ee7209e",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-health-normal",
  title: "Health at Normal",
  thing: "temper-armor-enchant/health",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 734,
} as const satisfies TemperGearGrade
