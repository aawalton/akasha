import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerAnswerCatalogCapture = {
  id: "01a15562-a568-7ade-ab1a-7ab1b94626c9",
  type: "page-type/module",
  slug: "player-answer-catalog-capture",
  definition: "the collector saving what the game answered about the character as a catalog",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The character is asked about once for each game version, as every catalog is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character is asked about after every other catalog is collected.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The size of the game's interface is saved beside the answers.",
    },
  ],
  createdAt: "2026-10-19T18:18:10.663Z",
  updatedAt: "2026-10-19T18:18:10.663Z",
} as const satisfies Module
