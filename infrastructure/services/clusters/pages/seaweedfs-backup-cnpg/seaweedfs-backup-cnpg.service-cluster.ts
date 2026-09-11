import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const seaweedfsBackupCnpg = {
  id: "01a06816-68b2-7eef-b522-058dbe5af91b",
  type: "service-cluster",
  slug: "seaweedfs-backup-cnpg",
  definition: "what copies the Postgres backups off to separate storage",
  resourceKind: "CronJob",
  namespace: "seaweedfs-backup-cnpg",
  resourceName: "seaweedfs-backup-cnpg",
  image: "rclone/rclone:1.74.3",
  schedule: "7,22,37,52 * * * *",
  manifest: "seaweedfs-backup-cnpg",
} as const satisfies ServiceCluster
