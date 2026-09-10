import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const registry = {
  id: "01a06812-2380-78aa-994b-e27680b0a2eb",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "registry",
  definition: "the store with the images the cluster runs",
  resourceKind: "Deployment",
  namespace: "registry",
  resourceName: "registry",
  image: "registry:3.0.0",
  replicas: 1,
  containerPort: 5000,
  manifest: "registry",
} as const satisfies ClusterService
