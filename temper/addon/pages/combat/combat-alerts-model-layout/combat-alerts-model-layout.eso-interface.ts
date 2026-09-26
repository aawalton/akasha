import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const combatAlertsModelLayout = {
  id: "01a0de7e-a0f8-7ed6-9e53-b8e2389e6eac",
  type: "page-type/eso-interface",
  slug: "combat-alerts-model-layout",
  definition: "the texture and label templates the combat alerts build models from",
  markup: "xml",
  loadedAs: "TemperCombatAlerts_Model.xml",
} as const satisfies EsoInterface
