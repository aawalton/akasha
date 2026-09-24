import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingNormalPenetrationPhysical = {
  id: "01a0d3e7-790e-7827-ae07-e69a1f707bdc",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-normal-penetration-physical",
  title: "Crushing at Normal on Penetration Physical",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 1621,
} as const satisfies TemperGearGrade
