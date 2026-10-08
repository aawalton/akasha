import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libraryLogger = {
  id: "01a090e5-9062-788e-8317-a0e2f1dee9b7",
  type: "page-type/module",
  slug: "library-logger",
  definition: "the log a library writes under its own identifier",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A library naming no loaded log library raises the identifier it asked under.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "TemperDebugLogger is loaded before the library asking for a log.",
    },
  ],
  createdAt: "2026-09-11T14:35:58.946Z",
  updatedAt: "2026-09-22T13:46:23.000Z",
} as const satisfies Module
