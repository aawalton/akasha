import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const turnSeating = {
  id: "01a18cb7-b408-7eaa-a402-7496190b8412",
  type: "page-type/select-property",
  slug: "turn-seating",
  propertySlug: "turn-seating",
  definition: "how a played story makes its turns",
  values: ["seat-graph", "one-seat"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story stating nothing here makes its turns as `seat-graph`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A `seat-graph` story's turns pass from seat to seat, each seat handing in its step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `one-seat` story's game master seat hands in every step but the player's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `one-seat` story starts and tells no seat but its game master seat for a turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `one-seat` story's game master seat reads the lore its world builder holds.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-30T13:00:00.000Z",
  updatedAt: "2026-10-30T13:00:00.000Z",
} as const satisfies SelectProperty
