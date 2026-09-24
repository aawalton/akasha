import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingFinePenetrationPhysical = {
  id: "01a0d3e7-671f-775e-b91a-6a40688dcc88",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-fine-penetration-physical",
  title: "Crushing at Fine on Penetration Physical",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 1692,
} as const satisfies TemperGearGrade
