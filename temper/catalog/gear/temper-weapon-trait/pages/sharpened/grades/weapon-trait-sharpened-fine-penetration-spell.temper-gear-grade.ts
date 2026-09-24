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
} as const satisfies TemperGearGrade
