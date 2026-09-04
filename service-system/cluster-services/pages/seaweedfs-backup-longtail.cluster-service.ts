import type { ClusterService } from "../cluster-service.page-type.ts"

export const seaweedfsBackupLongtail = {
  id: "01a06863-74e1-724d-a15e-66c67cb38571",
  pageTypeSlug: "cluster-service",
  slug: "seaweedfs-backup-longtail",
  definition: "what copies the oldest backups on to slower storage",
  resourceKind: "CronJob",
  namespace: "seaweedfs",
  resourceName: "seaweedfs-backup-longtail",
  image: "registry.registry.svc.cluster.local:5000/cluster/postgres-gfs-promoter:r4",
  schedule: "17 4 * * *",
  manifestCode:
    "infrastructure/backup-retention/seaweedfs-backup-longtail/seaweedfs-backup-longtail.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
