import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleMatcherContextCurseState = {
  id: "01a06151-370d-745a-96d3-e57c7a242777",
  pageTypeSlug: "module",
  slug: "rule-matcher-context-curse-state",
  definition:
    "which characters are vampires or werewolves, compiled into a reader the matcher calls",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character carrying neither curse answers as nothing.",
    },
  ],
} as const satisfies Module
