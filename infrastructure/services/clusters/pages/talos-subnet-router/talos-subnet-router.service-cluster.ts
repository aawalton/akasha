import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const talosSubnetRouter = {
  id: "01a06812-2380-7d28-a4a5-09178aa6be26",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "talos-subnet-router",
  definition: "the router carrying private network traffic to the cluster nodes' addresses",
  resourceKind: "Deployment",
  namespace: "headscale",
  resourceName: "talos-subnet-router",
  image: "tailscale/tailscale:v1.98.10",
  replicas: 1,
  manifest: "talos-subnet-router",
} as const satisfies ServiceCluster
