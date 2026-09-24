import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingFineHealthRecovery = {
  id: "01a0d3e9-1738-72a7-87d5-5597a99145de",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-fine-health-recovery",
  title: "Invigorating at Fine on Health Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 10,
} as const satisfies TemperGearGrade
