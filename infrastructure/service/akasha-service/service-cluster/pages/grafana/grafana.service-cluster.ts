import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const grafana = {
  id: "01a06812-2380-7fff-8630-86902909325b",
  type: "page-type/service-cluster",
  slug: "grafana",
  definition: "the server that draws recorded metrics and logs as charts",
  resourceKind: "Deployment",
  namespace: "grafana",
  resourceName: "grafana",
  image: "grafana/grafana:11.2.2",
  replicas: 1,
  containerPort: 3000,
  manifest: ["manifest/grafana"],
  secrets: ["secret/grafana-secrets-grafana-admin-password"],
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceCluster
