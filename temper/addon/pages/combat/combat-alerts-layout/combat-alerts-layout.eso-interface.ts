import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const combatAlertsLayout = {
  id: "01a0de7e-a0f8-7862-abc6-3f654119991e",
  type: "page-type/eso-interface",
  slug: "combat-alerts-layout",
  definition: "the alert lines, damageable timer and prominent alert layout of the combat alerts",
  markup: "xml",
  loadedAs: "TemperCombatAlerts.xml",
} as const satisfies EsoInterface
