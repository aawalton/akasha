import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const inferenceWan = {
  id: "01a093fb-ba5e-7535-a5b3-40b902e37bc8",
  type: "page-type/namespace",
  slug: "inference-wan",
  definition: "Wan video clips and the frames taken out of them",
  parts: [
    "command/inference-wan-extend",
    "command/inference-wan-frame",
    "command/inference-wan-generate",
    "command/inference-wan-score",
    "module/wan-clip-rendering",
    "module/wan-hosting",
  ],
  name: "wan",
  createdAt: "2026-09-12T04:59:03.134Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
