import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoveryNormalHealthRecovery = {
  id: "01a0d3eb-856b-7b7a-99b2-90f3b1c953f8",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-normal-health-recovery",
  title: "Prismatic Recovery at Normal on Health Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 67,
} as const satisfies TemperGearGrade
