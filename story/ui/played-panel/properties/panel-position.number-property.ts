import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const panelPosition = {
  id: "01a0e7fb-e2e2-7902-9b4e-1fdef912331e",
  type: "page-type/number-property",
  slug: "panel-position",
  propertySlug: "position",
  definition: "where a panel is drawn among the panels of its place, on every play screen",
  max: null,
  unique: "unique-kind/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel of a lower position is drawn before a panel of a higher one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story played draws its panels in the one order their positions give.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No two panels share a position, so no story's list settles a tie.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
