import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantCrushingSuperiorPenetrationSpell = {
  id: "01a0d3e7-9ef0-7af4-8680-dc710ccb4c4e",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-crushing-superior-penetration-spell",
  title: "Crushing at Superior on Penetration Spell",
  thing: "temper-weapon-enchant/crushing",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-penetration-spell",
  value: 1830,
} as const satisfies TemperGearGrade
