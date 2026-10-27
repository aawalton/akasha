import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const difficultyPanel = {
  id: "01a17eef-b5f0-77aa-940f-5fa16d965a2c",
  type: "page-type/module",
  slug: "difficulty-panel",
  definition: "the difficulty level a played story plays at, chosen in place",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The levels and their words are read from their pages when the panel opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The levels are offered by their odds modifier, highest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming no level shows the level story-played declares by default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chosen level's failure ceiling is shown beneath it.",
    },
  ],
  createdAt: "2026-10-27T19:56:41.328Z",
  updatedAt: "2026-10-27T19:56:41.328Z",
} as const satisfies Module
