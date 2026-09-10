import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const nodeExporterDaemonset = {
  id: "01a06812-2380-745d-b472-9c01fc3c6797",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "node-exporter-daemonset",
  definition: "the daemon publishing each node's processor, memory, disk and network as metrics",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "node-exporter",
  image: "prom/node-exporter:v1.8.2",
  containerPort: 9100,
  manifest: "node-exporter-daemonset",
} as const satisfies ClusterService
