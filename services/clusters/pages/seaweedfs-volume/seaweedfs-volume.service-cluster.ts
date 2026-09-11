import type { ServiceCluster } from "akasha/services/clusters/service-cluster.page-type.types.ts"

export const seaweedfsVolume = {
  id: "01a06816-68b1-7d63-9c32-76a6915a2d9d",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "seaweedfs-volume",
  definition: "what holds the bytes of the files that are stored",
  resourceKind: "Deployment",
  namespace: "seaweedfs",
  resourceName: "volume",
  image: "chrislusf/seaweedfs:3.73",
  replicas: 1,
  containerPort: 8080,
  manifest: "seaweedfs-volume",
} as const satisfies ServiceCluster
