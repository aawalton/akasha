import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tradingEntry = {
  id: "01a06160-2a5a-71e6-8292-47916aad37fc",
  type: "page-type/module",
  slug: "trading-entry",
  definition: "what the listings add-on does as the game loads it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Expired listings are dropped before anything is captured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Guild Store Search opens from a button inside the game's store window, in the game's look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Pressing the button again, the search's close, or leaving the store hides the search.",
    },
  ],
  createdAt: "2026-09-02T09:08:07.386Z",
  updatedAt: "2026-09-26T13:31:12.000Z",
} as const satisfies Module
