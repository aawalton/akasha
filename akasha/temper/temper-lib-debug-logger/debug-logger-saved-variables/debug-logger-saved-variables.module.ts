import type { Module } from "@akasha/code-system/module"

export const debugLoggerSavedVariables = {
  id: "01a06061-408f-7283-a6ff-efcb493f633f",
  pageTypeSlug: "module",
  slug: "debug-logger-saved-variables",
  definition: "the two tables the game keeps for this library between sessions",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The settings and the log are kept apart.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here runs at load.",
    },
  ],
} as const satisfies Module
