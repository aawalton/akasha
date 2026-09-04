import type { ClusterService } from "../../cluster-service.page-type.ts"

export const dcgmExporterDaemonset = {
  id: "01a06812-2380-779b-83b3-f7f564f62401",
  pageTypeSlug: "cluster-service",
  slug: "dcgm-exporter-daemonset",
  definition: "the daemon that publishes each node's graphics card as metrics",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "dcgm-exporter",
  image: "nvcr.io/nvidia/k8s/dcgm-exporter:3.3.8-3.6.0-ubuntu22.04",
  containerPort: 9400,
  manifestCode:
    "service-system/cluster-services/pages/dcgm-exporter-daemonset/dcgm-exporter-daemonset.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
