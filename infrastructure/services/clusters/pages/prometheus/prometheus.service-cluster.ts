import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const prometheus = {
  id: "01a06812-2380-7ad2-b1c3-165a11cded21",
  type: "service-cluster",
  slug: "prometheus",
  definition: "the server collecting the metrics every part publishes and keeping them over time",
  resourceKind: "Deployment",
  namespace: "prometheus",
  resourceName: "prometheus",
  image: "prom/prometheus:v2.54.1",
  replicas: 1,
  containerPort: 9090,
  manifest: "prometheus",
} as const satisfies ServiceCluster
