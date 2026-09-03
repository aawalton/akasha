import type { ClusterService } from "../cluster-service.page-type.ts"

export const promtail = {
  id: "01a06816-68b2-76ca-9850-ba1ff8ecee13",
  pageTypeSlug: "cluster-service",
  slug: "promtail",
  definition: "what collects the logs written on a node and ships them to the store",
  resourceKind: "DaemonSet",
  namespace: "loki",
  resourceName: "promtail",
  image: "grafana/promtail:3.1.0",
  containerPort: 3101,
  manifestCode:
    "akasha/infrastructure/loki-service/promtail/promtail.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
