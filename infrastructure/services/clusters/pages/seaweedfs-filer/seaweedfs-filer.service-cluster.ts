import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const seaweedfsFiler = {
  id: "01a06816-68b1-7864-ad3f-f262707c3baa",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "seaweedfs-filer",
  definition: "what gives the stored bytes their names and directories",
  resourceKind: "Deployment",
  namespace: "seaweedfs",
  resourceName: "filer",
  image: "chrislusf/seaweedfs:3.73",
  replicas: 1,
  containerPort: 8888,
  manifest: "seaweedfs-filer",
} as const satisfies ServiceCluster
