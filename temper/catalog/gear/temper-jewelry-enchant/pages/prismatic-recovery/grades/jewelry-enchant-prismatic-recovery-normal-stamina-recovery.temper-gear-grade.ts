import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoveryNormalStaminaRecovery = {
  id: "01a0d3eb-99dd-73b9-80d9-2d737974fa9c",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-normal-stamina-recovery",
  title: "Prismatic Recovery at Normal on Stamina Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 67,
} as const satisfies TemperGearGrade
