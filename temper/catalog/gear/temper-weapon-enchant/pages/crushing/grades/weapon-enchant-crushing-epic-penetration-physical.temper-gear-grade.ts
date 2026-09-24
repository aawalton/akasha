import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingEpicPenetrationPhysical = {
  id: "01a0d3e7-41ec-7f1e-988b-748812f7d142",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-epic-penetration-physical",
  title: "Crushing at Epic on Penetration Physical",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 1947,
} as const satisfies TemperGearGrade
