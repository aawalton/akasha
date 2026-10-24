import type { ClusterFoundation } from "akasha/infrastructure/service/akasha-service/cluster-foundation/cluster-foundation.page-type.types.ts"

export const clusterFoundations = {
  id: "01a0a5f0-7889-7744-b2cf-cb0590ba51f9",
  type: "page-type/cluster-foundation",
  slug: "cluster-foundations",
  definition: "the namespaces, the roles and the operator config building this cluster",
  manifest: [
    "manifest/app-namespaces-synth",
    "manifest/cert-manager-synth",
    "manifest/cluster-reach-synth",
    "manifest/deploy-account",
    "manifest/metallb-synth",
    "manifest/audit-cache",
    "manifest/deploy-cache",
  ],
  createdAt: "2026-09-15T16:39:55.273Z",
  updatedAt: "2026-10-24T21:54:14.478Z",
} as const satisfies ClusterFoundation
