import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const clusterManifest = {
  id: "01a06810-1263-7296-86ac-72d2a283e164",
  type: "domain",
  slug: "cluster-manifest",
  definition: "the Kubernetes manifests each part of the cluster is applied as",

  tunnelRoutes: "ts",
  parts: [
    "manifest/app-namespaces-synth",
    "manifest/cert-manager-synth",
    "manifest/cloudnative-pg-synth",
    "manifest/cluster-reach-synth",
    "manifest/metallb-synth",
    "module/orphan-resource-audit",
    "module/orphan-resource-listing",
    "module/orphan-sweep-notice",
    "module/orphan-sweeping",
    "module/tunnel-config",
    "module/tunnel-route",
    "module/tunnel-route-discovery",
    "service-workstation/orphaned-resources-sweep",
  ],
} as const satisfies Domain
