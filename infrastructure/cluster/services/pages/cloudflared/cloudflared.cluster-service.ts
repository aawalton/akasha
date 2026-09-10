import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const cloudflared = {
  id: "01a06812-2380-7f97-866f-639c805cd645",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "cloudflared",
  definition: "the daemon holding the tunnel traffic reaches the cluster over",
  resourceKind: "Deployment",
  namespace: "cloudflared",
  resourceName: "cloudflared",
  image: "cloudflare/cloudflared:2026.3.0",
  replicas: 2,
  containerPort: 2000,
  config: "yaml",
  manifest: "cloudflared",
  secrets: ["secret/cloudflared-creds-credentials-json"],
} as const satisfies ClusterService
