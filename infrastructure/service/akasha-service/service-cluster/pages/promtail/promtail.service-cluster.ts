import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const promtail = {
  id: "01a06816-68b2-76ca-9850-ba1ff8ecee13",
  type: "page-type/service-cluster",
  slug: "promtail",
  definition: "what collects the logs written on a node and ships them to the store",
  resourceKind: "DaemonSet",
  namespace: "loki",
  resourceName: "promtail",
  image: "grafana/promtail:3.1.0",
  containerPort: 3101,
  manifest: ["manifest/promtail"],
  createdAt: "2026-09-03T16:24:54.194Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceCluster
