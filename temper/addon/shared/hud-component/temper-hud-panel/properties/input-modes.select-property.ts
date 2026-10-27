import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const inputModes = {
  id: "01a17f00-bf0c-7fdd-96e3-d3c3f1a37d3a",
  type: "page-type/select-property",
  slug: "input-modes",
  propertySlug: "input-modes",
  definition: "the input modes a panel is placed in",
  values: ["keyboard", "gamepad"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An input mode is named keyboard or gamepad, as the game names its two modes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel is placed only while the game is in an input mode the panel states.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T20:15:17.769Z",
  updatedAt: "2026-10-27T20:15:17.769Z",
} as const satisfies SelectProperty
