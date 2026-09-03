import type { ClusterService } from "../../cluster-service.page-type.ts"

export const prometheus = {
  id: "01a06812-2380-7ad2-b1c3-165a11cded21",
  pageTypeSlug: "cluster-service",
  slug: "prometheus",
  definition: "the server collecting the metrics every part publishes and keeping them over time",
  resourceKind: "Deployment",
  namespace: "prometheus",
  resourceName: "prometheus",
  image: "prom/prometheus:v2.54.1",
  replicas: 1,
  containerPort: 9090,
  manifestCode:
    "akasha/service-system/cluster-services/pages/prometheus/prometheus.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
