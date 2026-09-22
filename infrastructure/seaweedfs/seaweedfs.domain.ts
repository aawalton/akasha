import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seaweedfs = {
  id: "01a06816-68b1-73dc-970e-be70fec533a1",
  type: "page-type/domain",
  slug: "seaweedfs",
  definition: "the manifests the cluster's own object store is applied as",
  parts: [
    "manifest/seaweedfs-filer",
    "manifest/seaweedfs-maintenance",
    "manifest/seaweedfs-master",
    "manifest/seaweedfs-s3-gateway",
    "manifest/seaweedfs-volume",
    "module/seaweedfs-constants",
    "module/seaweedfs-deployments",
    "module/seaweedfs-maintenance-manifests",
    "module/seaweedfs-namespace",
  ],
} as const satisfies Domain
