import type { ClusterService } from "../cluster-service.page-type.ts"

export const seaweedfsBackupAssets = {
  id: "01a06816-68b2-7119-9839-b6f8439a8555",
  pageTypeSlug: "cluster-service",
  slug: "seaweedfs-backup-assets",
  definition: "what copies the stored assets off to separate storage",
  resourceKind: "CronJob",
  namespace: "seaweedfs-backup-assets",
  resourceName: "seaweedfs-backup-assets",
  image: "rclone/rclone:1.74.3",
  schedule: "5 5 * * *",
  manifestCode:
    "infrastructure/seaweedfs/backup-assets/seaweedfs-backup-assets.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
