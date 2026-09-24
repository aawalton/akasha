import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const talosSubnetRouter = {
  id: "01a06812-2380-7d28-a4a5-09178aa6be26",
  type: "page-type/service-cluster",
  slug: "talos-subnet-router",
  definition: "the router carrying private network traffic to the cluster nodes' addresses",
  resourceKind: "Deployment",
  namespace: "headscale",
  resourceName: "talos-subnet-router",
  image: "tailscale/tailscale:v1.98.10",
  replicas: 1,
  manifest: ["manifest/talos-subnet-router"],
  secrets: ["secret/subnet-router-auth"],
} as const satisfies ServiceCluster
