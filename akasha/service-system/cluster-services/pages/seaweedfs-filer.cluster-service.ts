import type { ClusterService } from "../cluster-service.page-type.ts"

export const seaweedfsFiler = {
  id: "01a06816-68b1-7864-ad3f-f262707c3baa",
  pageTypeSlug: "cluster-service",
  slug: "seaweedfs-filer",
  definition: "what gives the stored bytes their names and directories",
  resourceKind: "Deployment",
  namespace: "seaweedfs",
  resourceName: "filer",
  image: "chrislusf/seaweedfs:3.73",
  replicas: 1,
  containerPort: 8888,
  manifestCode:
    "akasha/infrastructure/seaweedfs/filer/seaweedfs-filer.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
