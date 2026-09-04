import type { Module } from "@akasha/code-system/module"

export const supervisorChildExitRule = {
  id: "01a0683e-3dbe-700f-9725-cda76a9d7b7e",
  pageTypeSlug: "module",
  slug: "supervisor-child-exit-rule",
  definition: "the child-exit readings asked of the deciding command",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stop reason the rule and the column disagree on stamps nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An unread classification is null rather than a guess at how the child stopped.",
    },
  ],
} as const satisfies Module
