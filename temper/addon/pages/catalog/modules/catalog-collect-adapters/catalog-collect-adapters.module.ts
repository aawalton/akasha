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
    {
      decisionKind: "decision-kind/constraint",
      statement: "A fault the game reports carries the whole stack that fault was raised through.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A reason too long for the game to save loses every skip saved beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reason is saved as one line of three hundred characters at most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole reason is written to the chat window, where no ceiling reaches it.",
    },
  ],
} as const satisfies Module
