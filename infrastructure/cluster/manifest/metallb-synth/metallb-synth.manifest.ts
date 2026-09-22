import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const metallbSynth = {
  id: "01a06810-1262-7696-970a-91682eb0719b",
  type: "page-type/manifest",
  slug: "metallb-synth",
  definition: "the address pool holding the addresses a load balancer hands a service",
  code: "ts",
} as const satisfies Manifest
