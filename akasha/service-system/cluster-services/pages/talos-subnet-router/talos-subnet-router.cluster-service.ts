import type { ClusterService } from "../../cluster-service.page-type.ts"

export const talosSubnetRouter = {
  id: "01a06812-2380-7d28-a4a5-09178aa6be26",
  pageTypeSlug: "cluster-service",
  slug: "talos-subnet-router",
  definition: "the router carrying private network traffic to the cluster nodes' addresses",
  resourceKind: "Deployment",
  namespace: "headscale",
  resourceName: "talos-subnet-router",
  image: "tailscale/tailscale:v1.98.10",
  replicas: 1,
  manifestCode:
    "akasha/service-system/cluster-services/pages/talos-subnet-router/talos-subnet-router.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
