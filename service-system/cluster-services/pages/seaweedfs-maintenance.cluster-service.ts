import type { ClusterService } from "../cluster-service.page-type.ts"

export const seaweedfsMaintenance = {
  id: "01a06816-68b2-73ad-b106-fece69b13da9",
  pageTypeSlug: "cluster-service",
  slug: "seaweedfs-maintenance",
  definition: "what rebalances and compacts the volumes files are held in",
  resourceKind: "CronJob",
  namespace: "seaweedfs-maintenance",
  resourceName: "seaweedfs-maintenance",
  image: "chrislusf/seaweedfs:3.73",
  schedule: "43 6 * * 0",
  manifestCode:
    "akasha/infrastructure/seaweedfs/maintenance/seaweedfs-maintenance.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
