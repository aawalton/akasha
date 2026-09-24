import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseSuperiorHealthMaximum = {
  id: "01a0d3e7-9eba-7480-83c7-0b89d5fd616d",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-superior-health-maximum",
  title: "Prismatic Defense at Superior on Health Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 429,
} as const satisfies TemperGearGrade
