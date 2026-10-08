import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectionsLoaded = {
  id: "01a0624c-a660-7bb7-a785-531905b18e57",
  type: "page-type/module",
  slug: "collections-loaded",
  definition: "what starts each tracker once the game says the add-on has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every tracker the collections feature ships is started from here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No tracker is started twice.",
    },
  ],
  createdAt: "2026-09-02T13:26:25.632Z",
  updatedAt: "2026-09-22T02:53:52.000Z",
} as const satisfies Module
