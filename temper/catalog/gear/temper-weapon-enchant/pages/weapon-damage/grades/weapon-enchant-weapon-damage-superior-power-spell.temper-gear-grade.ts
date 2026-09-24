import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageSuperiorPowerSpell = {
  id: "01a0d3e8-0388-7202-8a0b-c6cb2ff41a55",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-superior-power-spell",
  title: "Weapon Damage at Superior on Power Spell",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-power-spell",
  value: 153,
} as const satisfies TemperGearGrade
