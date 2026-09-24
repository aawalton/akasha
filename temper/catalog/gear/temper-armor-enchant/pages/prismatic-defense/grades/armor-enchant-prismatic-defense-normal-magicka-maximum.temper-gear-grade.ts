import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseNormalMagickaMaximum = {
  id: "01a0d3e7-e05f-7d5b-b68e-ca2ac72adc2a",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-normal-magicka-maximum",
  title: "Prismatic Defense at Normal on Magicka Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 347,
} as const satisfies TemperGearGrade
