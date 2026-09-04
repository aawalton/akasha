import type { Module } from "@akasha/code-system/module"

export const workflowWatchGate = {
  id: "01a0685e-023f-7005-ac38-bca30f7d56b3",
  pageTypeSlug: "module",
  slug: "workflow-watch-gate",
  definition: "whether what a pipeline changed lies under a workflow's watch",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workflow declaring it always runs is watched by everything.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline stating no graph watches every workflow with everything.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow's watch is the closure its dispatch nodes and node types reach.",
    },
  ],
} as const satisfies Module
