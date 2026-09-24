import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseNormalStaminaMaximum = {
  id: "01a0d3e7-e9cd-7c21-958f-7884f3bf7131",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-normal-stamina-maximum",
  title: "Prismatic Defense at Normal on Stamina Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-maximum",
  value: 347,
} as const satisfies TemperGearGrade
