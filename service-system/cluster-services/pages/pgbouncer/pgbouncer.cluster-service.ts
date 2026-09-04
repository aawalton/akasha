import type { ClusterService } from "../../cluster-service.page-type.ts"

export const pgbouncer = {
  id: "01a06812-2380-75cf-80e3-e1ea919cfaca",
  pageTypeSlug: "cluster-service",
  slug: "pgbouncer",
  definition: "the pooler that holds the database connections callers are handed",
  resourceKind: "Deployment",
  namespace: "pgbouncer",
  resourceName: "pgbouncer",
  image: "edoburu/pgbouncer:v1.25.1-p0",
  replicas: 1,
  containerPort: 5432,
  manifestCode:
    "akasha/service-system/cluster-services/pages/pgbouncer/pgbouncer.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
