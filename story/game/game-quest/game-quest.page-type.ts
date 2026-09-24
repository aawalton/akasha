import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameQuest = {
  id: "01a0c6ab-e5a8-7bc3-a0c8-83d4a81beda0",
  type: "page-type/page-type",
  slug: "game-quest",
  definition: "something a game has set its player to do, and what doing it earns",
  pluralSlug: "quests",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/holding-game", required: true, many: false },
    { pageProperty: "text-property/listed-note", required: false, many: false },
    { pageProperty: "text-property/quest-objective", required: true, many: false },
    { pageProperty: "text-property/quest-reward", required: false, many: false },
    { pageProperty: "text-property/quest-status", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest belongs to one game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest sits under the game that set it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A quest carries whether it is done, and the turn that did it says so in a window.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No quest holds the prose of the turns that pursued it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: [
    "text-property/quest-objective",
    "text-property/quest-reward",
    "text-property/quest-status",
  ],
} as const satisfies PageType
