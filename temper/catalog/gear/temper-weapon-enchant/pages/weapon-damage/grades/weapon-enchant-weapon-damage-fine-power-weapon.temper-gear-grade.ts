import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageFinePowerWeapon = {
  id: "01a0d3e7-d608-712c-af9b-3aca6c67271d",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-fine-power-weapon",
  title: "Weapon Damage at Fine on Power Weapon",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 141,
} as const satisfies TemperGearGrade
