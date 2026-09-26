import type { TemperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.types.ts"

export const lightAttackCooldown = {
  id: "01a0dee9-6d54-79c6-89a7-a41b3da9744e",
  type: "page-type/temper-companion-combat-mechanic",
  slug: "light-attack-cooldown",
  key: "light-attack-cooldown",
  title: "Light Attack Global Cooldown",
  mechanicValue: 0.7,
} as const satisfies TemperCompanionCombatMechanic
