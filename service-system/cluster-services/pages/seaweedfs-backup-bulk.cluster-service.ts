import type { ClusterService } from "../cluster-service.page-type.ts"

export const seaweedfsBackupBulk = {
  id: "01a06816-68b2-77c0-978a-5f3ba0874d8e",
  pageTypeSlug: "cluster-service",
  slug: "seaweedfs-backup-bulk",
  definition: "what copies the logs, agent sessions and network database off to separate storage",
  resourceKind: "CronJob",
  namespace: "seaweedfs-backup-bulk",
  resourceName: "seaweedfs-backup-bulk",
  image: "rclone/rclone:1.74.3",
  schedule: "40 4 * * *",
  manifestCode:
    "infrastructure/seaweedfs/backup-bulk/seaweedfs-backup-bulk.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
