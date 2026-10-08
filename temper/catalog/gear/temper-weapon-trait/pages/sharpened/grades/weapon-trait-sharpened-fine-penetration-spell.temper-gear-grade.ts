import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedFinePenetrationSpell = {
  id: "01a0d3ea-036b-7f3b-83d9-1b1ef15ad82b",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-fine-penetration-spell",
  title: "Sharpened at Fine on Penetration Spell",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 1485,
  rawValue: 1485.2727272727273,
  createdAt: "2026-09-24T14:55:24.011Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperGearGrade
