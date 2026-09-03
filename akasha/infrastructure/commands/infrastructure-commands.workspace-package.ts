import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const infrastructureCommands = {
  id: "01a06810-9439-77f1-8f99-344e527d650b",
  pageTypeSlug: "workspace-package",
  slug: "infrastructure-commands",
  definition: "what an agent runs by name over what the system runs on",
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
    "module/pipeline-answering",
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
