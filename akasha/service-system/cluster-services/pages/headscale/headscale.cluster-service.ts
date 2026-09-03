import type { ClusterService } from "../../cluster-service.page-type.ts"

export const headscale = {
  id: "01a06812-2380-7204-bb6c-c05c012bbf72",
  pageTypeSlug: "cluster-service",
  slug: "headscale",
  definition:
    "the server admitting a machine to the private network and telling it where the others are",
  resourceKind: "StatefulSet",
  namespace: "headscale",
  resourceName: "headscale",
  image: "headscale/headscale:0.28.0",
  replicas: 1,
  containerPort: 8443,
  manifestCode:
    "akasha/service-system/cluster-services/pages/headscale/headscale.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
