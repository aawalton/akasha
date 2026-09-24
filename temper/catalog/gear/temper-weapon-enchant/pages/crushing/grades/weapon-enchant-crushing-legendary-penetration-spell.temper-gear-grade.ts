import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingLegendaryPenetrationSpell = {
  id: "01a0d3e7-b05d-7147-be35-345cd5a18d21",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-legendary-penetration-spell",
  title: "Crushing at Legendary on Penetration Spell",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 2108,
} as const satisfies TemperGearGrade
