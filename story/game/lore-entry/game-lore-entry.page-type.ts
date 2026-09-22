import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameLoreEntry = {
  id: "01a0c949-5c56-7f25-8eb3-0c04a8c40172",
  type: "page-type/page-type",
  slug: "game-lore-entry",
  definition: "one thing a game has settled as true in its world, and the turn it came from",
  pluralSlug: "lore-entries",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/holding-game", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore entry belongs to one game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore entry sits under the game whose world it is true of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lore entry cites the turn the entry was drawn from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a lore entry says was disclosed in play rather than designed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry's kind settles which of the rest of its properties that entry carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No lore entry holds the prose of the turn it was drawn from.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
