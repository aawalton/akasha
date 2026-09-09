import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const seaweedfs = {
  id: "01a06816-68b1-73dc-970e-be70fec533a1",
  pageTypeSlug: "workspace-package",
  slug: "seaweedfs",
  definition: "the manifests the cluster's own object store is applied as",
  manifest: "json",
  parts: [
    "manifest/seaweedfs-backup-assets",
    "manifest/seaweedfs-backup-bulk",
    "manifest/seaweedfs-backup-cnpg",
    "manifest/seaweedfs-etcd-snapshot",
    "manifest/seaweedfs-filer",
    "manifest/seaweedfs-maintenance",
    "manifest/seaweedfs-master",
    "manifest/seaweedfs-prune-sessions",
    "manifest/seaweedfs-s3-gateway",
    "manifest/seaweedfs-volume",
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
