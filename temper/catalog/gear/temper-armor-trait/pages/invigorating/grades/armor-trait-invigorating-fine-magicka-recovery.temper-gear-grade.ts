import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingFineMagickaRecovery = {
  id: "01a0d3e9-2014-70a2-85d4-14aac5d0f9d8",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-fine-magicka-recovery",
  title: "Invigorating at Fine on Magicka Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 10,
} as const satisfies TemperGearGrade
