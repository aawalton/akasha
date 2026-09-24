import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageEpicPowerSpell = {
  id: "01a0d3e7-c2ca-7d0b-9a69-3220c7f56f4d",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-epic-power-spell",
  title: "Weapon Damage at Epic on Power Spell",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-power-spell",
  value: 160,
} as const satisfies TemperGearGrade
