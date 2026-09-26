import type { TemperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.types.ts"

export const playerHealth = {
  id: "01a0df2f-299e-78d3-b156-00bfcf3a5d9c",
  type: "page-type/temper-companion-combat-mechanic",
  slug: "player-health",
  key: "player-health",
  title: "Player Health",
  mechanicValue: 25000,
} as const satisfies TemperCompanionCombatMechanic
