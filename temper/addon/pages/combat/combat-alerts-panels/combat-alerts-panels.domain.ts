import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const combatAlertsPanels = {
  id: "01a0debb-df28-734f-95bb-41116f85d495",
  type: "page-type/domain",
  slug: "combat-alerts-panels",
  definition: "the combat alerts crowd control alerts, damageable timers and panels entry",
  parts: ["type-declaration/combat-alerts-panels-declarations"],
} as const satisfies Domain
