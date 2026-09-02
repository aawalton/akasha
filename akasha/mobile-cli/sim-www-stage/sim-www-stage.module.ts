import type { Module } from "@akasha/code-system/module"

export const simWwwStage = {
  id: "01a05cee-e560-7417-9312-b0a5a3996f67",
  pageTypeSlug: "module",
  slug: "sim-www-stage",
  definition: "the web bundle staged into a native shell from the working tree",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The package the stage script runs in is named on the app's page rather than counted from its path.",
    },
    {
      invariantKind: "departure",
      statement: "The SPA source root reaches the stage script as an environment variable.",
    },
    {
      invariantKind: "departure",
      statement: "A staged bundle older than the newest SPA source file is stale.",
    },
    {
      invariantKind: "departure",
      statement: "A missing web env file is copied in from the main worktree of the same repo.",
    },
    {
      invariantKind: "departure",
      statement: "An app whose shell carries a committed `www/` names no stage script.",
    },
  ],
} as const satisfies Module
