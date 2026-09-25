import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const launchFlags = {
  id: "01a06964-d998-7def-b199-95bb54b08519",
  type: "page-type/module",
  slug: "launch-flags",
  definition: "the words every command that starts an agent uses",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the settings page sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The settings body is the file beside that page rather than a second path.",
    },
  ],
} as const satisfies Module
