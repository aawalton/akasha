import type { ClusterService } from "../cluster-service.page-type.ts"

export const seaweedfsMaster = {
  id: "01a06816-68b1-7782-ae24-3afcb9a52746",
  pageTypeSlug: "cluster-service",
  slug: "seaweedfs-master",
  definition: "what decides which volume a stored file goes to",
  resourceKind: "Deployment",
  namespace: "seaweedfs",
  resourceName: "master",
  image: "chrislusf/seaweedfs:3.73",
  replicas: 1,
  containerPort: 9333,
  manifestCode:
    "infrastructure/seaweedfs/master/seaweedfs-master.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
