import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedSuperiorPenetrationSpell = {
  id: "01a0d3ea-31c2-718a-850e-160e24c0610b",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-superior-penetration-spell",
  title: "Sharpened at Superior on Penetration Spell",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 1542,
  rawValue: 1542.5454545454545,
  createdAt: "2026-09-24T14:55:35.874Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperGearGrade
