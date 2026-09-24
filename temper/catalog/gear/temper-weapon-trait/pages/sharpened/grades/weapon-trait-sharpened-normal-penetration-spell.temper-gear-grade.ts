import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedNormalPenetrationSpell = {
  id: "01a0d3ea-1629-702c-9e57-289d42689271",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-normal-penetration-spell",
  title: "Sharpened at Normal on Penetration Spell",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 1428,
} as const satisfies TemperGearGrade
