import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedStateSheet = {
  id: "01a17eca-6f60-7578-8898-c4a7c88dbae4",
  type: "page-type/module",
  slug: "played-state-sheet",
  definition: "the state a story played draws, made from what its character's pages were read as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character whose pages hold nothing has no state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part read as nothing is left off the sheet rather than drawn empty.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store, so what is handed in is all that is read.",
    },
  ],
  createdAt: "2026-10-27T19:15:58.431Z",
  updatedAt: "2026-10-27T19:15:58.431Z",
} as const satisfies Module
