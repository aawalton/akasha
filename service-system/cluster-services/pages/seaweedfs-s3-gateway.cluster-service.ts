import type { ClusterService } from "../cluster-service.page-type.ts"

export const seaweedfsS3Gateway = {
  id: "01a06816-68b2-74df-a01e-80d84ed05948",
  pageTypeSlug: "cluster-service",
  slug: "seaweedfs-s3-gateway",
  definition: "what serves the stored files over the S3 interface",
  resourceKind: "Deployment",
  namespace: "seaweedfs",
  resourceName: "s3-gateway",
  image: "chrislusf/seaweedfs:3.73",
  replicas: 1,
  containerPort: 8333,
  manifestCode:
    "akasha/infrastructure/seaweedfs/s3-gateway/seaweedfs-s3-gateway.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
