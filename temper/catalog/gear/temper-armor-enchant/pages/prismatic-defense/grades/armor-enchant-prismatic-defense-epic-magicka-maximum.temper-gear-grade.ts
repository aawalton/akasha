import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseEpicMagickaMaximum = {
  id: "01a0d3e7-ba0e-7e09-8c2b-b63a3df34e1f",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-epic-magicka-maximum",
  title: "Prismatic Defense at Epic on Magicka Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 412,
} as const satisfies TemperGearGrade
