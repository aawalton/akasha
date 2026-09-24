import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseEpicStaminaMaximum = {
  id: "01a0d3e7-c4d3-7045-b28c-b8959ba363dc",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-epic-stamina-maximum",
  title: "Prismatic Defense at Epic on Stamina Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 412,
} as const satisfies TemperGearGrade
