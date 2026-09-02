import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionScopeRollup = {
  id: "01a06326-436a-75d2-8ece-d1941d997a46",
  pageTypeSlug: "module",
  slug: "completion-scope-rollup",
  definition: "what one scope of completion cards counts, and the three scopes added together",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One fold adds every scope.",
    },
    {
      invariantKind: "departure",
      statement: "A card that starts over each day is left out of an account or character scope.",
    },
    {
      invariantKind: "departure",
      statement: "Every companion card counts.",
    },
  ],
} as const satisfies Module
