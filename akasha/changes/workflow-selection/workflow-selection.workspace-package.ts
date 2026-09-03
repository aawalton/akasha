import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const workflowSelection = {
  id: "01a0685e-023f-7000-b596-7932b66f31e2",
  pageTypeSlug: "workspace-package",
  slug: "workflow-selection",
  definition:
    "which workflows a pipeline runs, and what it carries over from the pipelines it supersedes",
  manifest: "json",
  partSlugs: [
    "module/ci-page-row-reads",
    "module/ci-status-vocabulary",
    "module/closure-reach",
    "module/pipeline-config-building",
    "module/pipeline-entities",
    "module/pipeline-workflow-selection",
    "module/workflow-branch-filter",
    "module/workflow-config",
    "module/workflow-topology",
    "module/workflow-watch-gate",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Selection reads what it is handed and reaches no page and no process.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow a newer pipeline does not create is carried over rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow already in a terminal status is never carried over.",
    },
    {
      invariantKind: "departure",
      statement:
        "Carrying workflows over is abandoned whole where it would make the order impossible.",
    },
    {
      invariantKind: "gap",
      statement:
        "What answers whether a changed file lies under a workflow's watch stands outside akasha, on the old graph.",
    },
  ],
} as const satisfies WorkspacePackage
