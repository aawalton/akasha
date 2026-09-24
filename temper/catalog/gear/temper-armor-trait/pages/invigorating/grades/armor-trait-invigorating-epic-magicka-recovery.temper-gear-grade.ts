import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingEpicMagickaRecovery = {
  id: "01a0d3e9-055b-72ed-ac23-18fed37c8253",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-epic-magicka-recovery",
  title: "Invigorating at Epic on Magicka Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 14,
} as const satisfies TemperGearGrade
