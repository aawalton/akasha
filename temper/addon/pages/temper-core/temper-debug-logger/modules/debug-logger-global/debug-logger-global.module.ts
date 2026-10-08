import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerGlobal = {
  id: "01a06061-408e-75d3-8681-fc041df27d68",
  type: "page-type/module",
  slug: "debug-logger-global",
  definition: "the library's global name for the game and other addons",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading twice raises an error rather than replacing the library.",
    },
  ],
  createdAt: "2026-09-02T04:29:41.390Z",
  updatedAt: "2026-09-22T13:45:15.000Z",
} as const satisfies Module
