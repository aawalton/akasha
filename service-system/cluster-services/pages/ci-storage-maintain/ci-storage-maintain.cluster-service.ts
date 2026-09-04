import type { ClusterService } from "../../cluster-service.page-type.ts"

export const ciStorageMaintain = {
  id: "01a06812-2380-721d-86c6-c527a8991fb3",
  pageTypeSlug: "cluster-service",
  slug: "ci-storage-maintain",
  definition: "the daemon that prunes the pipeline's storage on each node",
  resourceKind: "DaemonSet",
  namespace: "ci",
  resourceName: "ci-storage-maintain",
  image: "alpine:3.21",
  manifestCode:
    "service-system/cluster-services/pages/ci-storage-maintain/ci-storage-maintain.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
