import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const upscaleBenchSynth = {
  id: "01a06815-9efd-7033-94e5-a09ca99e9413",
  type: "manifest",
  slug: "upscale-bench-synth",
  definition: "the manifests the upscale benchmark job is applied as",
  code: "ts",
} as const satisfies Manifest
