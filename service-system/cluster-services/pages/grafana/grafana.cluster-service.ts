import type { ClusterService } from "../../cluster-service.page-type.ts"

export const grafana = {
  id: "01a06812-2380-7fff-8630-86902909325b",
  pageTypeSlug: "cluster-service",
  slug: "grafana",
  definition: "the server that draws recorded metrics and logs as charts",
  resourceKind: "Deployment",
  namespace: "grafana",
  resourceName: "grafana",
  image: "grafana/grafana:11.2.2",
  replicas: 1,
  containerPort: 3000,
  manifestCode:
    "service-system/cluster-services/pages/grafana/grafana.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
