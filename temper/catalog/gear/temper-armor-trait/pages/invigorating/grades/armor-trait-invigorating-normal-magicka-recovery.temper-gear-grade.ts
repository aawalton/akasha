import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingNormalMagickaRecovery = {
  id: "01a0d3e9-4396-7a39-9e81-ef374a793205",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-normal-magicka-recovery",
  title: "Invigorating at Normal on Magicka Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 8,
  createdAt: "2026-09-24T14:54:34.902Z",
  updatedAt: "2026-09-24T14:54:57.000Z",
} as const satisfies TemperGearGrade
