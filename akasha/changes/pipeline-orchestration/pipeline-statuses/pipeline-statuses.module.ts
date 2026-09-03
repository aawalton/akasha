import type { Module } from "@akasha/code-system/module"

export const pipelineStatuses = {
  id: "01a0685e-023f-700e-b8e0-970195b86115",
  pageTypeSlug: "module",
  slug: "pipeline-statuses",
  definition: "the statuses the orchestrator reads a pipeline, a workflow and a step by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which statuses are non-terminal is read from the one CI status vocabulary rather than stated again here.",
    },
    {
      invariantKind: "departure",
      statement: "A status is handed to a page query as a list because a query takes a list.",
    },
    {
      invariantKind: "departure",
      statement: "A failed status and a blocked status cascade, and no other status does.",
    },
  ],
} as const satisfies Module
