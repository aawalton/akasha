import type { ClusterService } from "../../cluster-service.page-type.ts"

export const buildkitPrune = {
  id: "01a06812-237f-75a4-8884-ae6155609bc3",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "buildkit-prune",
  definition: "the job that clears build cache the builder is no longer using",
  resourceKind: "CronJob",
  namespace: "buildkit",
  resourceName: "buildkit-prune",
  image: "moby/buildkit:v0.28.0",
  schedule: "0 4 * * 0",
  manifest: "buildkit-prune",
} as const satisfies ClusterService
