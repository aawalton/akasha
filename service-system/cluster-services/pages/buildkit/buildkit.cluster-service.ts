import type { ClusterService } from "../../cluster-service.page-type.ts"

export const buildkit = {
  id: "01a06812-237f-7cab-9c28-f1508f8046fb",
  pageTypeSlug: "cluster-service",
  slug: "buildkit",
  definition: "the builder that turns a Dockerfile into an image",
  resourceKind: "Deployment",
  namespace: "buildkit",
  resourceName: "buildkit",
  image: "moby/buildkit:v0.28.0",
  replicas: 1,
  containerPort: 1234,
  manifestCode:
    "service-system/cluster-services/pages/buildkit/buildkit.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
