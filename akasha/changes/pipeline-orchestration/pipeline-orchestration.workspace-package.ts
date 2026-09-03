import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pipelineOrchestration = {
  id: "01a0685e-023f-700b-92a8-a24e9692597e",
  pageTypeSlug: "workspace-package",
  slug: "pipeline-orchestration",
  definition: "one pass over every pipeline still owed a verdict, run on the workstation",
  manifest: "json",
  partSlugs: [
    "module/branch-failure-answering",
    "module/branch-resolution-decision",
    "module/desired-pipelines",
    "module/orchestrator-log",
    "module/orchestrator-tick",
    "module/pipeline-page-rows",
    "module/pipeline-statuses",
    "module/tick-ceiling",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pipeline, workflow and step pages are read as files rather than through a service.",
    },
    {
      invariantKind: "departure",
      statement: "No worker is dispatched from here, and nothing here reaches the cluster.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick still working when its ceiling is reached ends rather than letting a second start beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pipeline that reached a verdict over a child that has not is reported as healing rather than written to.",
    },
    {
      invariantKind: "departure",
      statement:
        "One pipeline that could not be answered is counted and passed over, and every one failing throws.",
    },
  ],
} as const satisfies WorkspacePackage
