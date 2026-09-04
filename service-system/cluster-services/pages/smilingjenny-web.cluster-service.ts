import type { ClusterService } from "../cluster-service.page-type.ts"

export const smilingjennyWeb = {
  id: "01a05b26-f8b6-70f1-b1ef-8cafc8f8b6e6",
  pageTypeSlug: "cluster-service",
  slug: "smilingjenny-web",
  definition: "what runs Jenny's command center in the cluster",
  resourceKind: "Deployment",
  namespace: "smilingjenny",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifestCode:
    "akasha/smilingjenny/smilingjenny-web/smilingjenny-web.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
