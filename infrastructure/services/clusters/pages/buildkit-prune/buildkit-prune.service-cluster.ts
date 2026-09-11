import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const buildkitPrune = {
  id: "01a06812-237f-75a4-8884-ae6155609bc3",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "buildkit-prune",
  definition: "the job that clears build cache the builder is no longer using",
  resourceKind: "CronJob",
  namespace: "buildkit",
  resourceName: "buildkit-prune",
  image: "moby/buildkit:v0.28.0",
  schedule: "0 4 * * 0",
  manifest: "buildkit-prune",
} as const satisfies ServiceCluster
