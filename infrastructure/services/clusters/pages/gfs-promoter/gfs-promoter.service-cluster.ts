import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const gfsPromoter = {
  id: "01a06863-74e0-71ff-9c5e-43490fca32e3",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "gfs-promoter",
  definition: "what decides which Postgres backups are kept and which are released",
  resourceKind: "CronJob",
  namespace: "postgres",
  resourceName: "postgres-gfs-promoter",
  image: "registry.registry.svc.cluster.local:5000/cluster/postgres-gfs-promoter:r4",
  schedule: "17 2 * * *",
  manifest: "gfs-promoter",
} as const satisfies ServiceCluster
