import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const metallbSynth = {
  id: "01a06810-1262-7696-970a-91682eb0719b",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "metallb-synth",
  definition: "the address pool a load balancer hands a service an address out of",
  code: "ts",
} as const satisfies Manifest
