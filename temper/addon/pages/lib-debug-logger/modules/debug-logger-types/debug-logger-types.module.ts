import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerTypes = {
  id: "01a06061-4092-742f-b9c5-9cf888d52fd0",
  type: "page-type/module",
  slug: "debug-logger-types",
  definition: "the shapes a log entry, a logger and the library state take",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A log entry is a list rather than a record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field past the message is optional.",
    },
  ],
} as const satisfies Module
