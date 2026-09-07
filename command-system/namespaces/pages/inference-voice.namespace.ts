import type { Namespace } from "../namespace.page-type.ts"

export const inferenceVoice = {
  id: "01a07bc2-afbd-7714-895f-af8d84c2bc6d",
  pageTypeSlug: "namespace",
  slug: "inference-voice",
  definition: "a voice copied from a recording or drawn up from a description",
  partSlugs: ["command/inference-voice-clone", "command/inference-voice-design"],
} as const satisfies Namespace
