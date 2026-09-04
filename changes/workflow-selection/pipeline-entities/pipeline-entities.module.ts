import type { Module } from "@akasha/code-system/module"

export const pipelineEntities = {
  id: "01a0685e-023f-7002-9a0a-e115a4f6902a",
  pageTypeSlug: "module",
  slug: "pipeline-entities",
  definition: "the shapes a pipeline, a workflow and a step are held in while a run is decided",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pipeline, a workflow and a step each hold an identity and a status always.",
    },
    {
      invariantKind: "departure",
      statement:
        "A sequence number is held by a pipeline always and by a workflow and a step only once minted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step names the workflow it stands under rather than the workflow naming its steps.",
    },
  ],
} as const satisfies Module
