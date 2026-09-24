import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoveryEpicMagickaRecovery = {
  id: "01a0d3eb-21a2-7529-832e-acc275b02d5a",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-epic-magicka-recovery",
  title: "Prismatic Recovery at Epic on Magicka Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 80,
} as const satisfies TemperGearGrade
