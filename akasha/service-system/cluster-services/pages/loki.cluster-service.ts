import type { ClusterService } from "../cluster-service.page-type.ts"

export const loki = {
  id: "01a06816-68b2-782a-9997-af90e9fdae8a",
  pageTypeSlug: "cluster-service",
  slug: "loki",
  definition: "the store every log is shipped to and queried out of",
  resourceKind: "Deployment",
  namespace: "loki",
  resourceName: "loki",
  image: "grafana/loki:3.1.0",
  replicas: 1,
  containerPort: 3100,
  manifestCode: "akasha/infrastructure/loki-service/loki/loki.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
