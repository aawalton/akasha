import type { ClusterService } from "../../cluster-service.page-type.ts"

export const pageStore = {
  id: "01a05aba-55cb-7696-8110-a428e8ffd3f2",
  pageTypeSlug: "cluster-service",
  slug: "page-store",
  definition: "the forwarder that carries a pod's page request to the workstation",
  resourceKind: "Deployment",
  namespace: "page-store",
  resourceName: "page-store",
  image: "alpine/socat:1.8.0.3",
  replicas: 1,
  containerPort: 8787,
  manifestCode:
    "akasha/service-system/cluster-services/pages/page-store/page-store.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
