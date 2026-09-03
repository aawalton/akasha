import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const inferenceCommands = {
  id: "01a0685e-fd50-7e21-9c04-6b31a0f2c7de",
  pageTypeSlug: "workspace-package",
  slug: "inference-commands",
  definition: "what an agent runs by name over the models the inference hosts serve",
  manifest: "json",
  partSlugs: [
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
    "command/inference-voice-clone",
    "command/inference-voice-design",
    "module/inference-answering",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A command here files a run row for the work it sends to a model.",
    },
    {
      invariantKind: "gap",
      statement: "The run rows a command here files are akasha pages.",
    },
    {
      invariantKind: "gap",
      statement: "The registry of services and hosts a command here reads is in akasha.",
    },
  ],
} as const satisfies WorkspacePackage
