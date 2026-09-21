import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogCollectAdapters = {
  id: "01a063ba-94e5-7a59-9efa-ef08d6f1dfea",
  type: "page-type/module",
  slug: "catalog-collect-adapters",
  definition: "what the collection run calls to reach the game, the clock and the saved table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collector is called inside the game's protected call so a fault is caught.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault that is no text is reported under one fixed sentence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run leaving no skips clears the skips rather than leaving the old ones.",
    },
  ],
} as const satisfies Module
