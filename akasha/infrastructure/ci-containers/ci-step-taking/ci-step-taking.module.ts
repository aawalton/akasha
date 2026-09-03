import type { Module } from "@akasha/code-system/module"

export const ciStepTaking = {
  id: "01a06916-d3db-75db-b4e5-8dda71b79328",
  pageTypeSlug: "module",
  slug: "ci-step-taking",
  definition: "a step moved from one status to another, only from the status it was read at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step is moved under a lock keyed on its uncommitted file.",
    },
    {
      invariantKind: "departure",
      statement: "A step stating no status is read as pending.",
    },
    {
      invariantKind: "departure",
      statement: "A step whose status is not the one asked for is left as it is.",
    },
  ],
} as const satisfies Module
