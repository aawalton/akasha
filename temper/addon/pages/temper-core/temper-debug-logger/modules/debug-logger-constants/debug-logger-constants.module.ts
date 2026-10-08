import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerConstants = {
  id: "01a06061-408e-7921-b7b9-95d7deb170c4",
  type: "page-type/module",
  slug: "debug-logger-constants",
  definition: "the library's log levels, entry field positions and callback names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A log level is one letter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry field is reached by its position counting from the first field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order of the levels runs from verbose up to error.",
    },
  ],
  createdAt: "2026-09-02T04:29:41.390Z",
  updatedAt: "2026-09-22T14:13:12.000Z",
} as const satisfies Module
