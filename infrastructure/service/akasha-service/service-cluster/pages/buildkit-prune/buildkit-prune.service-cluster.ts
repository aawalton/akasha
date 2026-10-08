import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const buildkitPrune = {
  id: "01a06812-237f-75a4-8884-ae6155609bc3",
  type: "page-type/service-cluster",
  slug: "buildkit-prune",
  definition: "the job that clears build cache the builder is no longer using",
  resourceKind: "CronJob",
  namespace: "buildkit",
  resourceName: "buildkit-prune",
  image: "moby/buildkit:v0.28.0",
  schedule: "0 4 * * 0",
  manifest: ["manifest/buildkit-prune"],
  createdAt: "2026-09-03T16:20:14.335Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceCluster
