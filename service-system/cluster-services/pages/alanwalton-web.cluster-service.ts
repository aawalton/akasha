import type { ClusterService } from "../cluster-service.page-type.ts"

export const alanwaltonWeb = {
  id: "01a05b26-f8b6-7a67-91f5-db8495f03998",
  pageTypeSlug: "cluster-service",
  slug: "alanwalton-web",
  definition: "what runs Alan's command center in the cluster",
  resourceKind: "Deployment",
  namespace: "alanwalton",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifestCode: "akasha/alan/web/alanwalton-web.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
