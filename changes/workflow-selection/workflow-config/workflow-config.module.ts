import type { Module } from "@akasha/code-system/module"

export const workflowConfig = {
  id: "01a0685e-023f-7003-b737-2f0de92d2e0f",
  pageTypeSlug: "module",
  slug: "workflow-config",
  definition:
    "the declaration one workflow is selected by, the set of them a pipeline is selected from, and one workflow carried over from a pipeline that was superseded",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workflow declaration carries its own name and nothing else is required of it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pipeline stating no graph is a pipeline whose every workflow is watched by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A carried-over workflow names the pipeline it came from.",
    },
  ],
} as const satisfies Module
