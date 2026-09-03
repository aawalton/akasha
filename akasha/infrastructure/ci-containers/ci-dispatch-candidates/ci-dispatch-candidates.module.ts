import type { Module } from "@akasha/code-system/module"

export const ciDispatchCandidates = {
  id: "01a06861-24c9-7007-9782-e0c45eeadd1c",
  pageTypeSlug: "module",
  slug: "ci-dispatch-candidates",
  definition: "the dispatching steps a tick weighs, read beside their workflow and pipeline",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A step naming no title, no workflow or no pipeline is skipped rather than dispatched.",
    },
    {
      invariantKind: "departure",
      statement: "A step's definition is handed in rather than read here.",
    },
  ],
} as const satisfies Module
