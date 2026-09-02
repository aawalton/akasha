import type { Module } from "@akasha/code-system/module"

export const debugLoggerStartup = {
  id: "01a06061-4091-77bd-9447-9b61b31a9733",
  pageTypeSlug: "module",
  slug: "debug-logger-startup",
  definition: "what the library records about the client and the addons at load",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every addon the manager lists is recorded with its version and its folder.",
    },
    {
      invariantKind: "departure",
      statement: "An addon the game skipped is recorded with the reason.",
    },
    {
      invariantKind: "departure",
      statement: "A Lua error the game raises is recorded as an error entry.",
    },
    {
      invariantKind: "departure",
      statement: "A chat debug message and an alert are recorded as entries.",
    },
    {
      invariantKind: "departure",
      statement:
        "Gathering the client description is wrapped so a failure logs rather than throws.",
    },
  ],
} as const satisfies Module
