import type { ClusterService } from "../cluster-service.page-type.ts"

export const gitTransport = {
  id: "01a06816-2f11-7fe0-b5a2-6c9518d6f0c3",
  pageTypeSlug: "cluster-service",
  slug: "git-transport",
  definition: "what serves the repositories over the network",
  resourceKind: "Deployment",
  namespace: "git",
  resourceName: "git-transport",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifestCode: "git-transport/git-transport.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
