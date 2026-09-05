import type { Manifest } from "@akasha/k8s-types/manifest"

export const voiceInfer = {
  id: "01a0736f-e7a5-75ee-bda8-4298c8084c5b",
  pageTypeSlug: "manifest",
  slug: "voice-infer",
  definition: "the speech workload, its namespace and the way in to it",
  code: "ts",
} as const satisfies Manifest
