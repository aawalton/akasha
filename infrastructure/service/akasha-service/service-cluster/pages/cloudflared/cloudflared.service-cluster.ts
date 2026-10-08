import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const cloudflared = {
  id: "01a06812-2380-7f97-866f-639c805cd645",
  type: "page-type/service-cluster",
  slug: "cloudflared",
  definition: "the daemon holding the tunnel traffic takes to the cluster",
  resourceKind: "Deployment",
  namespace: "cloudflared",
  resourceName: "cloudflared",
  image: "cloudflare/cloudflared:2026.3.0",
  replicas: 2,
  containerPort: 2000,
  config: "yaml",
  manifest: ["manifest/cloudflared"],
  secrets: ["secret/cloudflared-creds-credentials-json"],
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceCluster
