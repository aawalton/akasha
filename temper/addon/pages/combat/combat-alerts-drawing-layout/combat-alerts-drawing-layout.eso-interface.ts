import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const combatAlertsDrawingLayout = {
  id: "01a0de7e-a0f8-735d-8d3f-f2ca19b0dd06",
  type: "page-type/eso-interface",
  slug: "combat-alerts-drawing-layout",
  definition: "the render space the combat alerts draw into",
  markup: "xml",
  loadedAs: "TemperCombatAlerts_Drawing.xml",
} as const satisfies EsoInterface
