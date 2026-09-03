import type { ClusterService } from "../cluster-service.page-type.ts"

export const audhdalanWeb = {
  id: "01a05b26-f8b6-702c-863b-08d754492dee",
  pageTypeSlug: "cluster-service",
  slug: "audhdalan-web",
  definition: "what serves the site Alan's neurodiversity writing is published on",
  resourceKind: "Deployment",
  namespace: "audhdalan",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifestCode: "akasha/audhdalan/audhdalan-web/audhdalan-web.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
