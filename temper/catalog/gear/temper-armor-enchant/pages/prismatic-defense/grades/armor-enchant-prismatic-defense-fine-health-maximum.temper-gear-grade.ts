import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseFineHealthMaximum = {
  id: "01a0d3e7-8bd4-7ec5-bd7f-93315eb8f913",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-fine-health-maximum",
  title: "Prismatic Defense at Fine on Health Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 405,
  createdAt: "2026-09-24T14:52:42.324Z",
  updatedAt: "2026-09-24T14:53:35.000Z",
} as const satisfies TemperGearGrade
