import type { ClusterService } from "../../cluster-service.page-type.ts"

export const ciStorageAdmin = {
  id: "01a06812-2380-7ed6-ad7d-b4e9ea150273",
  pageTypeSlug: "cluster-service",
  slug: "ci-storage-admin",
  definition: "the shell the pipeline's storage is reached through",
  resourceKind: "Deployment",
  namespace: "ci",
  resourceName: "ci-storage-admin",
  image: "alpine:3.21",
  replicas: 1,
  manifestCode:
    "akasha/service-system/cluster-services/pages/ci-storage-admin/ci-storage-admin.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
