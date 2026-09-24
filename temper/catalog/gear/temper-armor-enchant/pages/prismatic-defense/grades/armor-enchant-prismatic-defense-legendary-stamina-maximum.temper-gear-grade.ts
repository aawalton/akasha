import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseLegendaryStaminaMaximum = {
  id: "01a0d3e8-187f-7318-8447-dbbd88108194",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-legendary-stamina-maximum",
  title: "Prismatic Defense at Legendary on Stamina Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 434,
} as const satisfies TemperGearGrade
