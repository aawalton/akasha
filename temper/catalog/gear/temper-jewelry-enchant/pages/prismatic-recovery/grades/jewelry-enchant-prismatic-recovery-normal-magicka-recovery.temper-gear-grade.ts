import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoveryNormalMagickaRecovery = {
  id: "01a0d3eb-8fc0-7e0d-a170-8a363d68f0a2",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-normal-magicka-recovery",
  title: "Prismatic Recovery at Normal on Magicka Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 67,
} as const satisfies TemperGearGrade
