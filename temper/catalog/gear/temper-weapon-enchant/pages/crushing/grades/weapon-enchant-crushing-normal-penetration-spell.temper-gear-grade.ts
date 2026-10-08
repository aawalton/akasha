import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingNormalPenetrationSpell = {
  id: "01a0d3e7-821f-7d68-9b49-18ea52af5fe0",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-normal-penetration-spell",
  title: "Crushing at Normal on Penetration Spell",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 1621,
  createdAt: "2026-09-24T14:52:39.839Z",
  updatedAt: "2026-09-24T14:53:49.000Z",
} as const satisfies TemperGearGrade
