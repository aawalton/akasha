import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitSharpenedLegendaryPenetrationSpell = {
  id: "01a0d3ea-432f-735d-a18b-b2f3ce4702c3",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-sharpened-legendary-penetration-spell",
  title: "Sharpened at Legendary on Penetration Spell",
  thing: "temper-weapon-trait/sharpened",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 1638,
} as const satisfies TemperGearGrade
