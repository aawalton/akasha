import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const inference = {
  id: "01a07bc2-afbe-727e-90b4-d853582c03a2",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "inference",
  definition: "a model asked for something and what came back",
  parts: [
    "command/inference-activate",
    "command/inference-active",
    "command/inference-apply",
    "command/inference-capabilities",
    "command/inference-edit",
    "command/inference-generate",
    "command/inference-music",
    "command/inference-plan",
    "command/inference-segment",
    "command/inference-status",
    "command/inference-upscale",
    "command/inference-video-qa",
    "command/inference-wan",
    "command/inference-zimage",
    "namespace/inference-voice",
  ],
} as const satisfies Namespace
