import type { ServiceCluster } from "akasha/infrastructure/service/cluster/service-cluster.page-type.types.ts"

export const seaweedfsBackupLongtail = {
  id: "01a06863-74e1-724d-a15e-66c67cb38571",
  type: "page-type/service-cluster",
  slug: "seaweedfs-backup-longtail",
  definition: "what copies the oldest backups on to slower storage",
  resourceKind: "CronJob",
  namespace: "seaweedfs",
  resourceName: "seaweedfs-backup-longtail",
  image: "registry.registry.svc.cluster.local:5000/cluster/postgres-gfs-promoter:r4",
  schedule: "17 4 * * *",
  manifest: ["manifest/seaweedfs-backup-longtail"],
} as const satisfies ServiceCluster
