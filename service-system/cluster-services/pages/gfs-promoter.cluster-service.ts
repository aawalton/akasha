import type { ClusterService } from "../cluster-service.page-type.ts"

export const gfsPromoter = {
  id: "01a06863-74e0-71ff-9c5e-43490fca32e3",
  pageTypeSlug: "cluster-service",
  slug: "gfs-promoter",
  definition: "what decides which Postgres backups are kept and which are released",
  resourceKind: "CronJob",
  namespace: "postgres",
  resourceName: "postgres-gfs-promoter",
  image: "registry.registry.svc.cluster.local:5000/cluster/postgres-gfs-promoter:r4",
  schedule: "17 2 * * *",
  manifestCode:
    "infrastructure/backup-retention/gfs-promoter/gfs-promoter.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
