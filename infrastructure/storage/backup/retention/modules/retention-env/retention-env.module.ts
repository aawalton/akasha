import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const retentionEnv = {
  id: "01a06863-74e8-7ceb-92a7-1901f2d56e8f",
  type: "module",
  slug: "retention-env",
  definition: "what the environment states a retention run is to work against",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every setting has the cluster's own value as its default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is a rehearsal only where the environment says so outright.",
    },
  ],
} as const satisfies Module
