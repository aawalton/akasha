import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageEpicPowerWeapon = {
  id: "01a0d3e7-b9ce-71a9-a99c-8404daab3a6c",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-epic-power-weapon",
  title: "Weapon Damage at Epic on Power Weapon",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 160,
} as const satisfies TemperGearGrade
