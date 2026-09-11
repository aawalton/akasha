import type { Manifest } from "../../k8s-types/manifests/manifest.page-type.types.ts"

export const cloudnativePgSynth = {
  id: "01a06810-1262-73a0-9da5-97719150b83d",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "cloudnative-pg-synth",
  definition: "the namespace the Postgres operator runs in",
  code: "ts",
} as const satisfies Manifest
