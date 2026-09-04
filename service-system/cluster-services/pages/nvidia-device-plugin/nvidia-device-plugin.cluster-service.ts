import type { ClusterService } from "../../cluster-service.page-type.ts"

export const nvidiaDevicePlugin = {
  id: "01a06812-2380-7ce6-b001-50deac244107",
  pageTypeSlug: "cluster-service",
  slug: "nvidia-device-plugin",
  definition: "the daemon offering a node's graphics cards to the cluster as a resource",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "nvidia-device-plugin-daemonset",
  image: "nvcr.io/nvidia/k8s-device-plugin:v0.14.5",
  manifestCode:
    "akasha/service-system/cluster-services/pages/nvidia-device-plugin/nvidia-device-plugin.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
