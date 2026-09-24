import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageLegendaryPowerWeapon = {
  id: "01a0d3e8-16ea-74cd-afb4-8e1766ef1aa7",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-legendary-power-weapon",
  title: "Weapon Damage at Legendary on Power Weapon",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 174,
} as const satisfies TemperGearGrade
