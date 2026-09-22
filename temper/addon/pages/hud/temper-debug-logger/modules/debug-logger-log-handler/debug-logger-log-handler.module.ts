import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerLogHandler = {
  id: "01a06061-408f-7394-8aef-02461fccacdf",
  type: "page-type/module",
  slug: "debug-logger-log-handler",
  definition: "how a message becomes an entry in the log and how the log is pruned",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message repeating the message before that message raises a count rather than adding an entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string longer than the save limit is split into parts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The log is pruned once that log runs past the threshold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failed entry is written as a fallback entry rather than dropped.",
    },
  ],
} as const satisfies Module
