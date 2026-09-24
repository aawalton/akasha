import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseEpicHealthMaximum = {
  id: "01a0d3e7-829a-7ad7-b90a-3cabce434252",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-epic-health-maximum",
  title: "Prismatic Defense at Epic on Health Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 453,
} as const satisfies TemperGearGrade
