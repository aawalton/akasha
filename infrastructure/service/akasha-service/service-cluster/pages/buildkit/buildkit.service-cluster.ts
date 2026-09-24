import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const buildkit = {
  id: "01a06812-237f-7cab-9c28-f1508f8046fb",
  type: "page-type/service-cluster",
  slug: "buildkit",
  definition: "the builder that turns a Dockerfile into an image",
  resourceKind: "Deployment",
  namespace: "buildkit",
  resourceName: "buildkit",
  image: "moby/buildkit:v0.28.0",
  replicas: 1,
  containerPort: 1234,
  manifest: ["manifest/buildkit"],
} as const satisfies ServiceCluster
