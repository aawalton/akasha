import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorEnchantPrismaticDefenseFineMagickaMaximum = {
  id: "01a0d3e7-cd3f-7a9c-80d2-c890a19a718f",
  type: "page-type/temper-gear-grade",
  slug: "armor-enchant-prismatic-defense-fine-magicka-maximum",
  title: "Prismatic Defense at Fine on Magicka Maximum",
  thing: "temper-armor-enchant/prismatic-defense",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 368,
} as const satisfies TemperGearGrade
