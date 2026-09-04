import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const retentionEnv = {
  id: "01a06863-74e8-7ceb-92a7-1901f2d56e8f",
  pageTypeSlug: "module",
  slug: "retention-env",
  definition: "what the environment states a retention run is to work against",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every setting has the cluster's own value as its default.",
    },
    {
      invariantKind: "departure",
      statement: "A run is a rehearsal only where the environment says so outright.",
    },
  ],
} as const satisfies Module
