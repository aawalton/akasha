import type { Module } from "@akasha/code-system/module"

export const pipelineWorkflowSelection = {
  id: "01a0685e-023f-7008-a7b9-8571860b2b2a",
  pageTypeSlug: "module",
  slug: "pipeline-workflow-selection",
  definition:
    "which workflows a pipeline creates, which it passes over and why, which pipelines it supersedes, and which workflows it carries over from them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A pipeline supersedes only an earlier pipeline of its own branch that reached no verdict.",
    },
    {
      invariantKind: "departure",
      statement:
        "On main only a pending pipeline is superseded, and on any other branch any of them is.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow the newer pipeline creates itself is never carried over.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow no declaration names is carried over only where it is stateful.",
    },
    {
      invariantKind: "departure",
      statement:
        "A carried-over workflow keeps only the dependencies that name a workflow still standing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A workflow's changed files are the pipeline's own and its predecessors', kept to those its watch covers.",
    },
    {
      invariantKind: "departure",
      statement:
        "Carrying workflows over is abandoned whole rather than in part where it would close a ring.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow passed over is charged to its watch before its branch.",
    },
  ],
} as const satisfies Module
