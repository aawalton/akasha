import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const nvidiaDevicePlugin = {
  id: "01a06812-2380-7ce6-b001-50deac244107",
  type: "page-type/service-cluster",
  slug: "nvidia-device-plugin",
  definition: "the daemon offering a node's graphics cards to the cluster as a resource",
  resourceKind: "DaemonSet",
  namespace: "kube-system",
  resourceName: "nvidia-device-plugin-daemonset",
  image: "nvcr.io/nvidia/k8s-device-plugin:v0.14.5",
  manifest: ["manifest/nvidia-device-plugin"],
} as const satisfies ServiceCluster
