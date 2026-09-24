import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingSuperiorPenetrationPhysical = {
  id: "01a0d3e7-9635-77c1-8c1e-47fc5e6f51b5",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-superior-penetration-physical",
  title: "Crushing at Superior on Penetration Physical",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-penetration-physical",
  value: 1830,
} as const satisfies TemperGearGrade
