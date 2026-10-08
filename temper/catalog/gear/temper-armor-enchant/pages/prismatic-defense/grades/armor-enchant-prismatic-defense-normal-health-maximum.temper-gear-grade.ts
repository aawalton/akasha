import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseNormalHealthMaximum = {
  id: "01a0d3e7-9592-7ddf-a47f-e38edff51f36",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-normal-health-maximum",
  title: "Prismatic Defense at Normal on Health Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 381,
  createdAt: "2026-09-24T14:52:44.818Z",
  updatedAt: "2026-09-24T14:53:35.000Z",
} as const satisfies TemperGearGrade
