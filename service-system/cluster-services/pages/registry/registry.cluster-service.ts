import type { ClusterService } from "../../cluster-service.page-type.ts"

export const registry = {
  id: "01a06812-2380-78aa-994b-e27680b0a2eb",
  pageTypeSlug: "cluster-service",
  slug: "registry",
  definition: "the store holding the images the cluster runs",
  resourceKind: "Deployment",
  namespace: "registry",
  resourceName: "registry",
  image: "registry:3.0.0",
  replicas: 1,
  containerPort: 5000,
  manifestCode:
    "akasha/service-system/cluster-services/pages/registry/registry.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
