import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersConfig = {
  id: "01a062ed-3943-7005-848b-bc9123920f2f",
  type: "page-type/module",
  slug: "characters-config",
  definition: "the character order, the tasks and the completion floors that are in force",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the Lua table states is preferred to the value the saved table says.",
    },
  ],
  createdAt: "2026-09-02T16:21:48.995Z",
  updatedAt: "2026-10-19T19:38:44.378Z",
} as const satisfies Module
