import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageNormalPowerWeapon = {
  id: "01a0d3e7-e79e-7a13-bd56-c1b98f6c7574",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-normal-power-weapon",
  title: "Weapon Damage at Normal on Power Weapon",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 134,
} as const satisfies TemperGearGrade
