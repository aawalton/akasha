import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const combatAlertsDrawing = {
  id: "01a0debd-75c1-70d3-aab9-fbe8c6b73048",
  type: "page-type/domain",
  slug: "combat-alerts-drawing",
  definition: "the tether lines, gravestones and marker icons the combat alerts draw in the world",
  parts: [
    "module/combat-alerts-drawing-line",
    "module/combat-alerts-drawing-grave-elements",
    "module/combat-alerts-drawing-grave",
    "module/combat-alerts-drawing-grave-events",
  ],
} as const satisfies Domain
