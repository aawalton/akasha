import type { ClusterService } from "../cluster-service.page-type.ts"

export const seaweedfsVolume = {
  id: "01a06816-68b1-7d63-9c32-76a6915a2d9d",
  pageTypeSlug: "cluster-service",
  slug: "seaweedfs-volume",
  definition: "what holds the bytes of the files that are stored",
  resourceKind: "Deployment",
  namespace: "seaweedfs",
  resourceName: "volume",
  image: "chrislusf/seaweedfs:3.73",
  replicas: 1,
  containerPort: 8080,
  manifestCode:
    "infrastructure/seaweedfs/volume/seaweedfs-volume.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
