import type { Module } from "@akasha/code-system/module"

export const debugLoggerGlobal = {
  id: "01a06061-408e-75d3-8681-fc041df27d68",
  pageTypeSlug: "module",
  slug: "debug-logger-global",
  definition: "the one global name the game and other addons reach the library by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Loading twice raises an error rather than replacing the library.",
    },
  ],
} as const satisfies Module
