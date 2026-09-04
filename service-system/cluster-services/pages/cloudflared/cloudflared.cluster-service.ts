import type { ClusterService } from "../../cluster-service.page-type.ts"

export const cloudflared = {
  id: "01a06812-2380-7f97-866f-639c805cd645",
  pageTypeSlug: "cluster-service",
  slug: "cloudflared",
  definition: "the daemon holding the tunnel traffic reaches the cluster over",
  resourceKind: "Deployment",
  namespace: "cloudflared",
  resourceName: "cloudflared",
  image: "cloudflare/cloudflared:2026.3.0",
  replicas: 2,
  containerPort: 2000,
  manifestCode:
    "akasha/service-system/cluster-services/pages/cloudflared/cloudflared.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
