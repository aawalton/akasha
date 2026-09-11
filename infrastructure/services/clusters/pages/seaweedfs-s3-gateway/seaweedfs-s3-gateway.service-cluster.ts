import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const seaweedfsS3Gateway = {
  id: "01a06816-68b2-74df-a01e-80d84ed05948",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "seaweedfs-s3-gateway",
  definition: "what serves the stored files over the S3 interface",
  resourceKind: "Deployment",
  namespace: "seaweedfs",
  resourceName: "s3-gateway",
  image: "chrislusf/seaweedfs:3.73",
  replicas: 1,
  containerPort: 8333,
  manifest: "seaweedfs-s3-gateway",
  secrets: ["secret/seaweedfs-creds-s3-config"],
} as const satisfies ServiceCluster
