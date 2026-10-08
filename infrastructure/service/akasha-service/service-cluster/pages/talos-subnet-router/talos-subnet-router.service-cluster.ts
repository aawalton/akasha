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
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-09-24T23:14:05.000Z",
} as const satisfies ServiceCluster
