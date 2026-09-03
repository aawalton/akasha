import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pipelineSweep = {
  id: "01a0686c-e937-7006-8178-a6c1abce18dc",
  pageTypeSlug: "workspace-package",
  slug: "pipeline-sweep",
  definition: "what carries every unfinished pipeline, workflow and step to its next status",
  manifest: "json",
  partSlugs: ["module/pipeline-page-statuses", "module/pipeline-row-entities"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A status the sweep reads is one of the words stated here rather than any string.",
    },
    {
      invariantKind: "departure",
      statement: "A page row that states no seq is passed over rather than read as a pipeline.",
    },
    {
      invariantKind: "gap",
      statement:
        "The deciding, the cluster reading and the writing this package is for are still in tools/lib.",
    },
  ],
} as const satisfies WorkspacePackage
