import type { TemperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.types.ts"

export const globalCooldown = {
  id: "01a0dee9-6d53-7f7c-9d61-8e78c7c04182",
  type: "page-type/temper-companion-combat-mechanic",
  slug: "global-cooldown",
  key: "global-cooldown",
  title: "Global Cooldown",
  mechanicValue: 1,
} as const satisfies TemperCompanionCombatMechanic
