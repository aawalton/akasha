import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const voiceInfer = {
  id: "01a0736f-e7a5-75ee-bda8-4298c8084c5b",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "voice-infer",
  definition: "the speech workload, its namespace and the way in to it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
