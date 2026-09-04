import type { Module } from "@akasha/code-system/module"

export const desiredPipelines = {
  id: "01a0685e-023f-7012-86d7-3ee33c962b0d",
  pageTypeSlug: "module",
  slug: "desired-pipelines",
  definition: "the pipelines still owed a run, and those settled over a child that is not",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pipeline is owed a run where its own status is non-terminal.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pipeline holding a non-terminal workflow or step is owed a run whatever its own status.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline owed a run only through a child is reported as healing.",
    },
    {
      invariantKind: "departure",
      statement: "A child naming a pipeline that has no page is passed over rather than invented.",
    },
  ],
} as const satisfies Module
