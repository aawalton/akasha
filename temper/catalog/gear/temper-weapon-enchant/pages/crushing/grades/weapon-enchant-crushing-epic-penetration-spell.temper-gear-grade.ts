import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingEpicPenetrationSpell = {
  id: "01a0d3e7-5e65-7254-ac1f-b7443017a468",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-epic-penetration-spell",
  title: "Crushing at Epic on Penetration Spell",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 1947,
} as const satisfies TemperGearGrade
