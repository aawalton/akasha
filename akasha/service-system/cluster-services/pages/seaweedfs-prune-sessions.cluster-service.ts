import type { ClusterService } from "../cluster-service.page-type.ts"

export const seaweedfsPruneSessions = {
  id: "01a06816-68b2-782e-bab4-94b6543bc420",
  pageTypeSlug: "cluster-service",
  slug: "seaweedfs-prune-sessions",
  definition: "the sweep that removes stored agent sessions past their age",
  resourceKind: "CronJob",
  namespace: "seaweedfs-prune-sessions",
  resourceName: "seaweedfs-prune-sessions",
  image: "rclone/rclone:1.74.3",
  schedule: "24 5 * * *",
  manifestCode:
    "akasha/infrastructure/seaweedfs/prune-sessions/seaweedfs-prune-sessions.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
