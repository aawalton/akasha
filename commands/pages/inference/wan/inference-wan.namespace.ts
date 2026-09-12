import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const inferenceWan = {
  id: "01a093fb-ba5e-7535-a5b3-40b902e37bc8",
  type: "namespace",
  slug: "inference-wan",
  definition: "Wan video clips and the frames taken out of them",
  parts: [
    "command/inference-wan-extend",
    "command/inference-wan-frames",
    "command/inference-wan-generate",
    "command/inference-wan-score",
    "module/flag-arguing",
    "module/wan-arguing",
    "module/wan-clip-rendering",
    "module/wan-hosting",
  ],
  name: "wan",
} as const satisfies Namespace
