import type { ClusterService } from "../../cluster-service.page-type.ts"

export const buildkitPrune = {
  id: "01a06812-237f-75a4-8884-ae6155609bc3",
  pageTypeSlug: "cluster-service",
  slug: "buildkit-prune",
  definition: "the weekly job that clears the builder's cache",
  resourceKind: "CronJob",
  namespace: "buildkit",
  resourceName: "buildkit-prune",
  image: "moby/buildkit:v0.28.0",
  schedule: "0 4 * * 0",
  manifestCode:
    "akasha/service-system/cluster-services/pages/buildkit-prune/buildkit-prune.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
