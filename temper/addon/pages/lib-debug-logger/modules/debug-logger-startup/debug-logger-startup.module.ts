import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const debugLoggerStartup = {
  id: "01a06061-4091-77bd-9447-9b61b31a9733",
  type: "page-type/module",
  slug: "debug-logger-startup",
  definition: "what the library records about the client and the addons at load",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every addon the manager lists is recorded with its version and its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon the game skipped is recorded with the reason.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Lua error the game raises is recorded as an error entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chat debug message and an alert are recorded as entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Gathering the client description is wrapped so a failure logs rather than throws.",
    },
  ],
} as const satisfies Module
