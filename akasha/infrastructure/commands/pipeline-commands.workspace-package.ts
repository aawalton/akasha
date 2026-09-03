import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pipelineCommands = {
  id: "01a06810-9439-77f1-8f99-344e527d650b",
  pageTypeSlug: "workspace-package",
  slug: "pipeline-commands",
  definition: "what an agent runs by name over the build pipelines",
  manifest: "json",
  partSlugs: [
    "command/pipeline-benchmark",
    "command/pipeline-list",
    "command/pipeline-logs",
    "command/pipeline-perf",
    "command/pipeline-retry",
    "command/pipeline-show",
    "command/pipeline-step-cost",
    "command/pipeline-steps",
    "command/pipeline-workflows",
    "command/tests-triage-fanout",
    "module/pipeline-answering",
    "module/step-cost-summary",
    "module/step-row-format",
    "module/step-solo-time",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "gap",
      statement: "The pipeline pages a command here reads are in akasha.",
    },
  ],
} as const satisfies WorkspacePackage
