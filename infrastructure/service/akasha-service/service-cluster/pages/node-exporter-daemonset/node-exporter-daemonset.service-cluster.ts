import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const nodeExporterDaemonset = {
  id: "01a06812-2380-745d-b472-9c01fc3c6797",
  type: "page-type/service-cluster",
  slug: "node-exporter-daemonset",
  definition: "the daemon publishing each node's processor, memory, disk and network as metrics",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "node-exporter",
  image: "prom/node-exporter:v1.8.2",
  containerPort: 9100,
  manifest: ["manifest/node-exporter-daemonset"],
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceCluster
