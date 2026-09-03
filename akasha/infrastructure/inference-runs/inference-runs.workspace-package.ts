import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const inferenceRuns = {
  id: "01a0685d-4b35-7019-9d54-b15d9954b9b1",
  pageTypeSlug: "workspace-package",
  slug: "inference-runs",
  definition: "the record kept of every run a model was asked for and of what that run made",
  manifest: "json",
  partSlugs: [
    "module/generation-log",
    "module/inference-command-line",
    "module/inference-run-record",
    "module/inference-run-services",
    "module/inference-run-store",
    "module/persist-audio",
    "module/persist-image",
    "module/persist-media",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run is written down before it starts rather than once it has finished.",
    },
    {
      invariantKind: "departure",
      statement: "A run that throws is finished as failed rather than left running.",
    },
    {
      invariantKind: "departure",
      statement: "What a run made is kept as an object and named from the page it was made under.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a model service.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which host a service stands on.",
    },
  ],
} as const satisfies WorkspacePackage
