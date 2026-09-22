import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerGlobal = {
  id: "01a06061-408e-75d3-8681-fc041df27d68",
  type: "page-type/module",
  slug: "debug-logger-global",
  definition: "the one global name the game and other addons reach the library by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading twice raises an error rather than replacing the library.",
    },
  ],
} as const satisfies Module
