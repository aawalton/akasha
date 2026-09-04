import type { ClusterService } from "../../cluster-service.page-type.ts"

export const postgresCnpg = {
  id: "01a06812-2380-705a-87bc-2d6f0da9924c",
  pageTypeSlug: "cluster-service",
  slug: "postgres-cnpg",
  definition: "the managed cluster the Postgres database runs as",
  resourceKind: "Cluster",
  namespace: "postgres",
  resourceName: "postgres-cnpg",
  image:
    "registry.registry.svc.cluster.local:5000/cluster/postgres-cnpg:18-ts2.24-pgcron-pgnet-wal2json-pgjsonschema-r1",
  replicas: 2,
  manifestCode:
    "akasha/service-system/cluster-services/pages/postgres-cnpg/postgres-cnpg.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
