import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const inferenceClients = {
  id: "01a0682d-8f07-7000-ab6b-b7ebbf0863a0",
  pageTypeSlug: "workspace-package",
  slug: "inference-clients",
  definition: "how a caller reaches a model service and reads back what that service made",
  manifest: "json",
  partSlugs: [
    "module/ace-step-client",
    "module/comfy-client",
    "module/cop-fetch",
    "module/gemini-image-client",
    "module/inference-output-path",
    "module/inference-seed",
    "module/mlx-image-client",
    "module/mlx-vlm-client",
    "module/segment-client",
    "module/voice-clone-client",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A client speaks one service's own wire shape rather than a shape shared here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A client answers with the bytes the service made rather than with a path those bytes were written to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here keeps a record of the run it asked for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which host a service stands on.",
    },
  ],
} as const satisfies WorkspacePackage
