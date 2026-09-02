import type { Module } from "@akasha/code-system/module"

export const debugLoggerState = {
  id: "01a06061-4092-7326-8928-e32cb0041b24",
  pageTypeSlug: "module",
  slug: "debug-logger-state",
  definition: "the library table and the internal table every other module reads and fills in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every module reaches the same two tables.",
    },
    {
      invariantKind: "departure",
      statement:
        "A function on the internal table does nothing until a module fills that function in.",
    },
    {
      invariantKind: "departure",
      statement: "The session start time is the timestamp at load less the game time already run.",
    },
  ],
} as const satisfies Module
