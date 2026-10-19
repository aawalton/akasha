import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersConfig = {
  id: "01a062ed-3943-7005-848b-bc9123920f2f",
  type: "page-type/module",
  slug: "characters-config",
  definition:
    "the character order, the tasks, the completion floors and the readings that are in force",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the Lua table states is preferred to the value the saved table says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's reading is read from the Lua table alone.",
    },
  ],
  createdAt: "2026-09-02T16:21:48.995Z",
  updatedAt: "2026-10-19T18:59:03.808Z",
} as const satisfies Module
