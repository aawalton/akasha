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
      decisionKind: "decision-kind/absence",
      statement: "No turn holds a number one of its game's mechanics works out.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: [
    "number-property/turn-number",
    "text-property/window-kind",
    "text-property/window-rank",
    "record-property/system-window",
  ],
} as const satisfies PageType
