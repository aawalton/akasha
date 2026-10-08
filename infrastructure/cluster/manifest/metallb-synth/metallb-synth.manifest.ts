import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const metallbSynth = {
  id: "01a06810-1262-7696-970a-91682eb0719b",
  type: "page-type/manifest",
  slug: "metallb-synth",
  definition: "the address pool holding the addresses a load balancer hands a service",
  code: "ts",
  createdAt: "2026-09-03T16:17:58.882Z",
  updatedAt: "2026-09-22T13:46:54.000Z",
} as const satisfies Manifest
