import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const certManagerSynth = {
  id: "01a06810-1262-7065-b0b4-0de2efa13873",
  type: "page-type/manifest",
  slug: "cert-manager-synth",
  definition: "the issuer that answers a certificate request through a DNS record",
  code: "ts",
  createdAt: "2026-09-03T16:17:58.882Z",
  updatedAt: "2026-09-15T17:25:34.000Z",
} as const satisfies Manifest
