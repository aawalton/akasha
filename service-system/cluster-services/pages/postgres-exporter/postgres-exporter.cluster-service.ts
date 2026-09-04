import type { ClusterService } from "../../cluster-service.page-type.ts"

export const postgresExporter = {
  id: "01a06812-2380-7259-8296-16b643a8bc64",
  pageTypeSlug: "cluster-service",
  slug: "postgres-exporter",
  definition: "the server that publishes the database's state as metrics",
  resourceKind: "Deployment",
  namespace: "prometheus",
  resourceName: "postgres-exporter",
  image: "prometheuscommunity/postgres-exporter:v0.15.0",
  replicas: 1,
  containerPort: 9187,
  manifestCode:
    "service-system/cluster-services/pages/postgres-exporter/postgres-exporter.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
