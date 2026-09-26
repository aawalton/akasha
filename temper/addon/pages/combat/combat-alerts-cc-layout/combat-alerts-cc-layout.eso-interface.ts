import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const combatAlertsCcLayout = {
  id: "01a0de7e-a0f8-747c-b388-4bfd142de44a",
  type: "page-type/eso-interface",
  slug: "combat-alerts-cc-layout",
  definition: "the crowd control layout of the combat alerts",
  markup: "xml",
  loadedAs: "TemperCombatAlerts_CC.xml",
} as const satisfies EsoInterface
