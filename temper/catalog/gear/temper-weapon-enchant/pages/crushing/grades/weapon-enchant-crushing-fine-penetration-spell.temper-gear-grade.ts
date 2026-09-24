import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingFinePenetrationSpell = {
  id: "01a0d3e7-6fe7-7834-a878-b19577ec8fe9",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-fine-penetration-spell",
  title: "Crushing at Fine on Penetration Spell",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 1692,
} as const satisfies TemperGearGrade
