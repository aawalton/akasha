import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const prometheus = {
  id: "01a06812-2380-7ad2-b1c3-165a11cded21",
  type: "page-type/service-cluster",
  slug: "prometheus",
  definition: "the server collecting the metrics every part publishes and keeping them over time",
  resourceKind: "Deployment",
  namespace: "prometheus",
  resourceName: "prometheus",
  image: "prom/prometheus:v2.54.1",
  replicas: 1,
  containerPort: 9090,
  manifest: ["manifest/prometheus"],
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceCluster
