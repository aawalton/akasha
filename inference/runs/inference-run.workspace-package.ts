import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const inferenceRun = {
  id: "01a0685d-4b35-7019-9d54-b15d9954b9b1",
  pageTypeSlug: "workspace-package",
  slug: "inference-run",
  definition: "the record kept of every run a model was asked for and of what that run made",
  manifest: "json",
  parts: [
    "module/generation-log",
    "module/inference-command-line",
    "module/inference-run-record",
    "module/inference-run-services",
    "module/inference-run-store",
    "module/persist-audio",
    "module/persist-image",
    "module/persist-media",
    "page-type/inference-run",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A run is written down before that run starts rather than once that run has finished.",
    },
    {
      invariantKind: "departure",
      statement: "A run that throws is finished as failed rather than left running.",
    },
    {
      invariantKind: "departure",
      statement:
        "The media a run made is kept as an object and named from the page that object was made under.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a model service.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which host a service is on.",
    },
  ],
} as const satisfies WorkspacePackage
