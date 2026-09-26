import type { TemperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.types.ts"

export const baseCriticalHealing = {
  id: "01a0df10-4be8-7091-8d30-e63db447bcc1",
  type: "page-type/temper-companion-combat-mechanic",
  slug: "base-critical-healing",
  key: "base-critical-healing",
  title: "Base Critical Healing",
  mechanicValue: 0.5,
} as const satisfies TemperCompanionCombatMechanic
