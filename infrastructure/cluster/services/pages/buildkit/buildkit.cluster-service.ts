import type { ClusterService } from "../../cluster-service.page-type.ts"

export const buildkit = {
  id: "01a06812-237f-7cab-9c28-f1508f8046fb",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "buildkit",
  definition: "the builder that turns a Dockerfile into an image",
  resourceKind: "Deployment",
  namespace: "buildkit",
  resourceName: "buildkit",
  image: "moby/buildkit:v0.28.0",
  replicas: 1,
  containerPort: 1234,
  manifest: "buildkit",
} as const satisfies ClusterService
