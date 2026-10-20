import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersCharacterSheet = {
  id: "01a15979-efd3-7a6e-bd6e-cfc498088bfc",
  type: "page-type/module",
  slug: "characters-character-sheet",
  definition: "each number the game's character sheet shows that no reported stat holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The numbers are the attribute points spent and unspent, each critical chance, and riding skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A critical chance is kept as the percent the sheet shows for its rating.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each number is kept as the game gives it, before the sheet rounds it.",
    },
  ],
  createdAt: "2026-10-20T13:22:05.907Z",
  updatedAt: "2026-10-20T13:22:05.907Z",
} as const satisfies Module
