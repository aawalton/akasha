import type { TemperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.types.ts"

export const ultimateCap = {
  id: "01a0df10-4be9-7bae-bc54-16cb33858ae0",
  type: "page-type/temper-companion-combat-mechanic",
  slug: "ultimate-cap",
  key: "ultimate-cap",
  title: "Ultimate Cap",
  mechanicValue: 500,
} as const satisfies TemperCompanionCombatMechanic
