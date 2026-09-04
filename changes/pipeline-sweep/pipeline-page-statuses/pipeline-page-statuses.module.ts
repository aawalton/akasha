import type { Module } from "@akasha/code-system/module"

export const pipelinePageStatuses = {
  id: "01a0686c-e937-7007-9828-e95504ce44e4",
  pageTypeSlug: "module",
  slug: "pipeline-page-statuses",
  definition:
    "the statuses a pipeline, a workflow and a step stand in, and which of them are settled",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A settled status is never moved off.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow answered elsewhere counts against the pipeline holding it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pipeline on a branch other than main is overtaken by a newer one whatever it was doing.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline on main is overtaken only while it is still pending.",
    },
    {
      invariantKind: "gap",
      statement:
        'These sets state no "canceled", where every set in @akasha/workflow-selection/ci-status-vocabulary does.',
    },
  ],
} as const satisfies Module
