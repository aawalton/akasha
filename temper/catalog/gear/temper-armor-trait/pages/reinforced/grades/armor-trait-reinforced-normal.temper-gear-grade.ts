import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitReinforcedNormal = {
  id: "01a0d3e9-e461-7f0b-afc9-6dc8714e9a58",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-reinforced-normal",
  title: "Reinforced at Normal",
  thing: "temper-armor-trait/reinforced",
  quality: "temper-quality/normal",
  value: 0.12,
  createdAt: "2026-09-24T14:55:16.065Z",
  updatedAt: "2026-09-24T14:56:18.000Z",
} as const satisfies TemperGearGrade
