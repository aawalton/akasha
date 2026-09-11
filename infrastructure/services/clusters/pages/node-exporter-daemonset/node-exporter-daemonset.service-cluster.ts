import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const nodeExporterDaemonset = {
  id: "01a06812-2380-745d-b472-9c01fc3c6797",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "node-exporter-daemonset",
  definition: "the daemon publishing each node's processor, memory, disk and network as metrics",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "node-exporter",
  image: "prom/node-exporter:v1.8.2",
  containerPort: 9100,
  manifest: "node-exporter-daemonset",
} as const satisfies ServiceCluster
