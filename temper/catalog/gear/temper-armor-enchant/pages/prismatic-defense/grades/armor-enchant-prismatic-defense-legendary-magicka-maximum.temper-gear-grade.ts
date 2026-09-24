import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseLegendaryMagickaMaximum = {
  id: "01a0d3e8-0ed0-7133-8d65-6d99f3730628",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-legendary-magicka-maximum",
  title: "Prismatic Defense at Legendary on Magicka Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 434,
} as const satisfies TemperGearGrade
