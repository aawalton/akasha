import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseFineStaminaMaximum = {
  id: "01a0d3e7-d665-7f6f-8cab-77524b8a706c",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-fine-stamina-maximum",
  title: "Prismatic Defense at Fine on Stamina Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 368,
} as const satisfies TemperGearGrade
