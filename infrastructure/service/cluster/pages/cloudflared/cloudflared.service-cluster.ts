import type { ServiceCluster } from "akasha/infrastructure/service/cluster/service-cluster.page-type.types.ts"

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
} as const satisfies ServiceCluster
