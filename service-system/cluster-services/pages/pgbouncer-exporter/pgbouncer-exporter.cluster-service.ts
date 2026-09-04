import type { ClusterService } from "../../cluster-service.page-type.ts"

export const pgbouncerExporter = {
  id: "01a06812-2380-7c17-9f68-cd789c803dea",
  pageTypeSlug: "cluster-service",
  slug: "pgbouncer-exporter",
  definition: "the server that publishes the connection pool's state as metrics",
  resourceKind: "Deployment",
  namespace: "prometheus",
  resourceName: "pgbouncer-exporter",
  image: "prometheuscommunity/pgbouncer-exporter:v0.12.0",
  replicas: 1,
  containerPort: 9127,
  manifestCode:
    "akasha/service-system/cluster-services/pages/pgbouncer-exporter/pgbouncer-exporter.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
