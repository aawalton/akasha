import type { Module } from "@akasha/code-system/module"

export const workflowBranchFilter = {
  id: "01a0685e-023f-7006-9914-b9a259a9f0d3",
  pageTypeSlug: "module",
  slug: "workflow-branch-filter",
  definition: "the workflows a branch and a pipeline's changed files leave standing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workflow stating no branch filter runs on every branch.",
    },
    {
      invariantKind: "departure",
      statement: "A branch filter of a lone star runs on every branch.",
    },
    {
      invariantKind: "departure",
      statement:
        "A branch filter opening with an exclamation mark runs on every branch but the one it names.",
    },
    {
      invariantKind: "departure",
      statement: "The watch is asked before the branch, and a workflow must pass both.",
    },
  ],
} as const satisfies Module
