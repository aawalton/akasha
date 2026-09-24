import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoverySuperiorStaminaRecovery = {
  id: "01a0d3eb-e0cc-7e19-9e9e-55fa9a9b47f2",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-superior-stamina-recovery",
  title: "Prismatic Recovery at Superior on Stamina Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 75,
} as const satisfies TemperGearGrade
