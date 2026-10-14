import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersPassiveTrace = {
  id: "01a13ae5-59e0-7e84-9933-8c858b3849a3",
  type: "page-type/module",
  slug: "characters-passive-trace",
  definition:
    "what the game says of each class and armor passive, written to the saved table to be looked at",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This trace stays only until the capture finds every class passive Erin bought.",
    },
  ],
  createdAt: "2026-10-14T14:51:11.712Z",
  updatedAt: "2026-10-14T16:32:59.378Z",
} as const satisfies Module
