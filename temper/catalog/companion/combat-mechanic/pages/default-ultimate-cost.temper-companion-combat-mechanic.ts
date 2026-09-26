import type { TemperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.types.ts"

export const defaultUltimateCost = {
  id: "01a0df2f-299e-7b5f-9534-dbd0d546116f",
  type: "page-type/temper-companion-combat-mechanic",
  slug: "default-ultimate-cost",
  key: "default-ultimate-cost",
  title: "Default Ultimate Cost",
  mechanicValue: 100,
} as const satisfies TemperCompanionCombatMechanic
