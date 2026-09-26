import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const combatAlertsBossHealthBarLayout = {
  id: "01a0de7e-a0f7-702a-8841-65fd5a89f967",
  type: "page-type/eso-interface",
  slug: "combat-alerts-boss-health-bar-layout",
  definition: "the boss health bar layout of the combat alerts",
  markup: "xml",
  loadedAs: "TemperCombatAlerts_BossHealthBar.xml",
} as const satisfies EsoInterface
