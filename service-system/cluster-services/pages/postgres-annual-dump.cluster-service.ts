import type { ClusterService } from "../cluster-service.page-type.ts"

export const postgresAnnualDump = {
  id: "01a06865-c012-7a1d-b102-3faf8416b98f",
  pageTypeSlug: "cluster-service",
  slug: "postgres-annual-dump",
  definition: "what writes a whole copy of the database once a year",
  resourceKind: "CronJob",
  namespace: "postgres",
  resourceName: "postgres-annual-dump",
  image: "registry.registry.svc.cluster.local:5000/cluster/postgres-annual-dump:r1",
  schedule: "13 5 1 1 *",
  manifestCode:
    "akasha/infrastructure/postgres-annual-dump/postgres-annual-dump.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
