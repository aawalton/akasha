import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const certManagerSynth = {
  id: "01a06810-1262-7065-b0b4-0de2efa13873",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "cert-manager-synth",
  definition: "the issuer that answers a certificate request through a DNS record",
  code: "ts",
} as const satisfies Manifest
