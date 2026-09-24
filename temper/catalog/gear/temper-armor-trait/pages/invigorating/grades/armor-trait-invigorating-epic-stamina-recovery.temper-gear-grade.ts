import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingEpicStaminaRecovery = {
  id: "01a0d3e9-0e6f-79e2-9698-4d267f8b966e",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-epic-stamina-recovery",
  title: "Invigorating at Epic on Stamina Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 14,
} as const satisfies TemperGearGrade
