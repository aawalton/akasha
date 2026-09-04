import type { ClusterService } from "../cluster-service.page-type.ts"

export const temperWeb = {
  id: "01a05b26-f8b6-7b51-a3bf-3c4d1128e7e8",
  pageTypeSlug: "cluster-service",
  slug: "temper-web",
  definition: "what serves the parts of Temper that run in a browser",
  resourceKind: "Deployment",
  namespace: "temper",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifestCode: "temper/temper-web/temper-web.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
