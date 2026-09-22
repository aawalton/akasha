import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameDesignEntry = {
  id: "01a0c93c-f844-73b7-a9c9-68ff736436d1",
  type: "page-type/page-type",
  slug: "game-design-entry",
  definition: "a ruling a game's design rests on, settled before the play that uses it",
  pluralSlug: "design-entries",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/holding-game", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A design entry belongs to one game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A design entry sits under the game whose design it settles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A design entry is settled before the play using that entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a design entry settles is a file beside that entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a design entry has are the game master's rather than akasha's own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
