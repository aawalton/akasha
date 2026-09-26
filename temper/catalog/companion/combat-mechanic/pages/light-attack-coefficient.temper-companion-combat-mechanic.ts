import type { TemperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.types.ts"

export const lightAttackCoefficient = {
  id: "01a0df10-4be9-7977-ba89-50eb330b76ba",
  type: "page-type/temper-companion-combat-mechanic",
  slug: "light-attack-coefficient",
  key: "light-attack-coefficient",
  title: "Light Attack Coefficient",
  mechanicValue: 1.5,
} as const satisfies TemperCompanionCombatMechanic
