import type { ClusterFoundation } from "akasha/infrastructure/service/cluster-foundation/cluster-foundation.page-type.types.ts"

export const clusterFoundations = {
  id: "01a0a5f0-7889-7744-b2cf-cb0590ba51f9",
  type: "page-type/cluster-foundation",
  slug: "cluster-foundations",
  definition: "the namespaces, the roles and the operator configuration this cluster is built on",
  manifest: [
    "manifest/app-namespaces-synth",
    "manifest/cert-manager-synth",
    "manifest/cloudnative-pg-synth",
    "manifest/cluster-reach-synth",
    "manifest/deploy-account",
    "manifest/metallb-synth",
  ],
} as const satisfies ClusterFoundation
