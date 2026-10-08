import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const tailnetEgress = {
  id: "01a06812-2381-7f3f-ab43-4484649e98c0",
  type: "page-type/service-cluster",
  slug: "tailnet-egress",
  definition: "the proxy that carries a workload's traffic out over the private network",
  resourceKind: "Deployment",
  namespace: "tailnet-egress",
  resourceName: "tailnet-egress",
  image: "tailscale/tailscale:v1.98.10",
  replicas: 1,
  containerPort: 1055,
  manifest: ["manifest/tailnet-egress"],
  secrets: ["secret/tailnet-egress-auth"],
  createdAt: "2026-09-03T16:20:14.337Z",
  updatedAt: "2026-09-24T23:14:05.000Z",
} as const satisfies ServiceCluster
