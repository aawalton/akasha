import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageSuperiorPowerWeapon = {
  id: "01a0d3e7-fa57-7e2f-b505-ee75a7a060fa",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-superior-power-weapon",
  title: "Weapon Damage at Superior on Power Weapon",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 153,
} as const satisfies TemperGearGrade
