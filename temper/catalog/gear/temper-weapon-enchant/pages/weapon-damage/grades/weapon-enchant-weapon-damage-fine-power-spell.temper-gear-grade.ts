import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponEnchantWeaponDamageFinePowerSpell = {
  id: "01a0d3e7-dea8-7472-ad44-9f1ccb1ce617",
  type: "page-type/temper-gear-grade",
  slug: "weapon-enchant-weapon-damage-fine-power-spell",
  title: "Weapon Damage at Fine on Power Spell",
  thing: "temper-weapon-enchant/weapon-damage",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-power-spell",
  value: 141,
} as const satisfies TemperGearGrade
