import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersPopulatedName = {
  id: "01a062ea-5f76-7fa2-a4a3-a8b92e04561d",
  type: "page-type/module",
  slug: "characters-populated-name",
  definition: "the freshly read name where the game gave one, and the stored name otherwise",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Which of a stored and a freshly read name wins is settled here.",
    },
  ],
  createdAt: "2026-09-02T16:18:42.166Z",
  updatedAt: "2026-09-21T17:05:12.000Z",
} as const satisfies Module
