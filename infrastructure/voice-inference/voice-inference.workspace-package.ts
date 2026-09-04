import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const voiceInference = {
  id: "01a06815-9efd-701e-a4d4-a26f49e97554",
  pageTypeSlug: "workspace-package",
  slug: "voice-inference",
  definition: "speech turned into text and text turned into speech on one card",
  manifest: "json",
  partSlugs: [
    "cluster-service/voice-infer",
    "container-recipe/voice-infer-image",
    "python-module/voice-infer-server",
    "python-module/voice-models",
    "python-module/voice-object-store",
    "python-module/voice-speech-hls",
    "python-module/voice-speech-mp3",
    "shell-script/voice-infer-cluster-publish",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Both models are loaded before the workload reports itself healthy.",
    },
    {
      invariantKind: "departure",
      statement: "One inference runs at a time however many callers are waiting.",
    },
    {
      invariantKind: "constraint",
      statement: "The card this runs on takes int8 weights and not float16 ones.",
    },
  ],
} as const satisfies WorkspacePackage
