import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const clusterManifests = {
  id: "01a06810-1263-7296-86ac-72d2a283e164",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "cluster-manifests",
  definition: "the Kubernetes manifests each part of the cluster is applied as",

  tunnelRoutes: "ts",
  parts: [
    "manifest/app-namespaces-synth",
    "manifest/cert-manager-synth",
    "manifest/cloudnative-pg-synth",
    "manifest/metallb-synth",
    "module/orphan-resource-audit",
    "module/orphan-resource-listing",
    "module/orphan-sweep-notice",
    "module/orphan-sweeping",
    "module/tunnel-config",
    "module/tunnel-route",
    "module/tunnel-route-discovery",
    "workstation-service/orphaned-resources-sweep",
  ],
} as const satisfies Domain
