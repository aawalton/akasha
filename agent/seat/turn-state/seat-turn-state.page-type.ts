import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const seatTurnState = {
  id: "01a06924-e882-736f-8cac-465ef2b5d799",
  type: "page-type/page-type",
  slug: "seat-turn-state",
  definition: "what a seat is doing about its turn, and that state's color",
  extends: ["page-type/domain"],
  parts: [
    "relation-property/turn-state-color",
    "seat-turn-state/idle",
    "seat-turn-state/stopped",
    "seat-turn-state/working",
  ],
  properties: [{ pageProperty: "relation-property/turn-state-color", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is in one turn state at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state's slug is the name the seat system reads that state by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every turn state names a color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state that is stopped names a color too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color here is a name a palette resolves rather than a shade.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which agent is in which state.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
