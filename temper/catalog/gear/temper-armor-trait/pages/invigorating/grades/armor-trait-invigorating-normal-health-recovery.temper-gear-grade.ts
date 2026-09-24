import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingNormalHealthRecovery = {
  id: "01a0d3e9-3099-7e52-ba8f-47224326414b",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-normal-health-recovery",
  title: "Invigorating at Normal on Health Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 8,
} as const satisfies TemperGearGrade
