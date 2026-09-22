import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameTurn = {
  id: "01a0c67d-107c-7e63-8791-38c9b6c7128d",
  type: "page-type/page-type",
  slug: "game-turn",
  definition: "one turn of a game's play, and what the system said in it",
  pluralSlug: "turns",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "relation-property/holding-game", required: true, many: false },
    { pageProperty: "number-property/turn-number", required: true, many: false },
    { pageProperty: "record-property/system-window", required: false, many: true, maxCount: null },
    { pageProperty: "record-property/turn-pools", required: false, many: true, maxCount: null },
    { pageProperty: "record-property/turn-derived", required: false, many: true, maxCount: null },
    { pageProperty: "record-property/turn-rungs", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn belongs to one game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the system said in a turn is written on that turn.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No turn holds the prose that turn made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a mechanic worked out at a turn is written on that turn rather than worked out again.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: [
    "number-property/turn-number",
    "text-property/window-kind",
    "record-property/system-window",
    "module/turn-filing",
    "number-property/pool-change",
    "record-property/turn-pools",
    "number-property/pool-now",
    "number-property/pool-most",
    "number-property/derived-number",
    "record-property/turn-derived",
    "record-property/turn-rungs",
    "module/turn-state",
  ],
} as const satisfies PageType
