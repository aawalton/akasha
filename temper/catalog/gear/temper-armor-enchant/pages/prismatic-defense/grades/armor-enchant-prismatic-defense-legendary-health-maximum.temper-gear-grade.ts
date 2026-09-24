import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseLegendaryHealthMaximum = {
  id: "01a0d3e7-b142-7878-9248-38c95f5324b7",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-legendary-health-maximum",
  title: "Prismatic Defense at Legendary on Health Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 477,
} as const satisfies TemperGearGrade
