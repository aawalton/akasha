import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const seatTurnState = {
  id: "01a06924-e882-736f-8cac-465ef2b5d799",
  type: "page-type/page-type",
  slug: "seat-turn-state",
  definition: "what a seat is doing about its turn, and the color that is drawn in",
  extends: ["page-type/domain"],
  parts: [
    "relation-property/turn-state-color",
    "seat-turn-state/idle",
    "seat-turn-state/stopped",
    "seat-turn-state/working",
  ],
  properties: [{ pageProperty: "relation-property/turn-state-color", required: true, many: false }],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is in one turn state at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A state's slug is the name the seat system reads that state by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every turn state names a color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A state that is stopped names a color too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color here is a name a palette resolves rather than a shade.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which agent is in which state.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
