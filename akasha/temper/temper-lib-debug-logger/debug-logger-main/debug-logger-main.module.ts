import type { Module } from "@akasha/code-system/module"

export const debugLoggerMain = {
  id: "01a06061-408f-7340-8c9c-c97f192b2642",
  pageTypeSlug: "module",
  slug: "debug-logger-main",
  definition: "the order the library parts are switched on in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The logger class is ready before anything that makes a logger.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is exported.",
    },
  ],
} as const satisfies Module
