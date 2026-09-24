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
  ],
} as const satisfies ClusterFoundation
