import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const authProxy = {
  id: "01a06863-8e7c-7a70-a620-0a4edd125d51",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "auth-proxy",
  definition: "what decides who a request is from before it reaches anything",
  resourceKind: "Deployment",
  namespace: "auth-proxy",
  resourceName: "auth-proxy",
  image: "registry.registry.svc.cluster.local:5000/infra/auth-proxy",
  replicas: 2,
  containerPort: 3080,
  manifest: "auth-proxy-manifests",
} as const satisfies ClusterService
