import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const dcgmExporterDaemonset = {
  id: "01a06812-2380-779b-83b3-f7f564f62401",
  type: "page-type/service-cluster",
  slug: "dcgm-exporter-daemonset",
  definition: "the daemon that publishes each node's graphics card as metrics",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "dcgm-exporter",
  image: "nvcr.io/nvidia/k8s/dcgm-exporter:4.2.3-4.1.3-ubuntu22.04",
  containerPort: 9400,
  manifest: ["manifest/dcgm-exporter-daemonset"],
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceCluster
