import type { ServiceCluster } from "akasha/services/clusters/service-cluster.page-type.types.ts"

export const seaweedfsPruneSessions = {
  id: "01a06816-68b2-782e-bab4-94b6543bc420",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "seaweedfs-prune-sessions",
  definition: "the sweep that removes stored agent sessions past their age",
  resourceKind: "CronJob",
  namespace: "seaweedfs-prune-sessions",
  resourceName: "seaweedfs-prune-sessions",
  image: "rclone/rclone:1.74.3",
  schedule: "24 5 * * *",
  manifest: "seaweedfs-prune-sessions",
} as const satisfies ServiceCluster
