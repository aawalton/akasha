import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageNormalPowerSpell = {
  id: "01a0d3e7-f0eb-70d8-b560-73a3ebf84252",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-normal-power-spell",
  title: "Weapon Damage at Normal on Power Spell",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-power-spell",
  value: 134,
} as const satisfies TemperGearGrade
