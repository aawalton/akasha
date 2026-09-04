import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const seaweedfs = {
  id: "01a06816-68b1-73dc-970e-be70fec533a1",
  pageTypeSlug: "workspace-package",
  slug: "seaweedfs",
  definition: "the manifests the cluster's own object store is applied as",
  manifest: "json",
  partSlugs: [
    "module/seaweedfs-constants",
    "module/seaweedfs-namespace",
    "module/seaweedfs-deployments",
    "module/seaweedfs-backup-manifests",
    "module/seaweedfs-etcd-snapshot-manifests",
    "module/seaweedfs-longtail-assets",
    "module/seaweedfs-maintenance-manifests",
    "module/seaweedfs-prune-manifests",
  ],
} as const satisfies WorkspacePackage
