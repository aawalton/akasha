import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerSettings = {
  id: "01a06061-408f-7b57-ae4e-cf8306102001",
  type: "page-type/module",
  slug: "debug-logger-settings",
  definition: "the saved settings and the slash command reading and changing them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting absent from the saved table takes the default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved setting the defaults no longer name is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The slash command prints through the chat library where that library is loaded.",
    },
  ],
  createdAt: "2026-09-02T04:29:41.391Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
