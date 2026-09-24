import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageLegendaryPowerSpell = {
  id: "01a0d3e8-2003-7896-b2ee-580e74ef3502",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-legendary-power-spell",
  title: "Weapon Damage at Legendary on Power Spell",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-power-spell",
  value: 174,
} as const satisfies TemperGearGrade
