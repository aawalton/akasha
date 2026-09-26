import type { TemperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.types.ts"

export const offHandWeaponDamage = {
  id: "01a0df43-4d16-7400-bb59-65753e3a4c2a",
  type: "page-type/temper-companion-combat-mechanic",
  slug: "off-hand-weapon-damage",
  key: "off-hand-weapon-damage",
  title: "Off-Hand Weapon Damage",
  mechanicValue: 0.1775,
} as const satisfies TemperCompanionCombatMechanic
