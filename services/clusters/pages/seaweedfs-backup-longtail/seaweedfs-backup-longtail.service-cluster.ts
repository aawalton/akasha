import type { ServiceCluster } from "akasha/services/clusters/service-cluster.page-type.types.ts"

export const seaweedfsBackupLongtail = {
  id: "01a06863-74e1-724d-a15e-66c67cb38571",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "seaweedfs-backup-longtail",
  definition: "what copies the oldest backups on to slower storage",
  resourceKind: "CronJob",
  namespace: "seaweedfs",
  resourceName: "seaweedfs-backup-longtail",
  image: "registry.registry.svc.cluster.local:5000/cluster/postgres-gfs-promoter:r4",
  schedule: "17 4 * * *",
  manifest: "seaweedfs-backup-longtail",
} as const satisfies ServiceCluster
