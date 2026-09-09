import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const clusterManifests = {
  id: "01a06810-1263-7296-86ac-72d2a283e164",
  pageTypeSlug: "workspace-package",
  type: "workspace-package",
  slug: "cluster-manifests",
  definition: "the Kubernetes manifests each part of the cluster is applied as",
  manifest: "json",
  tunnelRoutes: "ts",
  parts: [
    "module/app-namespaces-synth",
    "module/cert-manager-synth",
    "module/cloudnative-pg-synth",
    "module/metallb-synth",
    "module/orphan-resource-audit",
    "module/orphan-resource-listing",
    "module/orphan-sweep-notice",
    "module/orphan-sweeping",
    "module/tunnel-config",
    "module/tunnel-route",
    "module/tunnel-route-discovery",
    "workstation-service/orphaned-resources-sweep",
  ],
} as const satisfies WorkspacePackage
