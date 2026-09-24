import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedEpicPenetrationSpell = {
  id: "01a0d3e9-f238-763f-ab02-3bc65c1850c1",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-epic-penetration-spell",
  title: "Sharpened at Epic on Penetration Spell",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 1580,
} as const satisfies TemperGearGrade
