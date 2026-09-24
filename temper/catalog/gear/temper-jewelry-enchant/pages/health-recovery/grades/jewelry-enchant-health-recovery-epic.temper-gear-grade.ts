import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantHealthRecoveryEpic = {
  id: "01a0d3e9-0e63-7698-af03-5025e173803d",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-health-recovery-epic",
  title: "Health Recovery at Epic",
  thing: "temper-jewelry-enchant/health-recovery",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 157,
} as const satisfies TemperGearGrade
