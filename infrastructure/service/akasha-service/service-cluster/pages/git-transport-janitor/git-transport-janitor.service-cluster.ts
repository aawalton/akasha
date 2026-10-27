import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const gitTransportJanitor = {
  id: "01a07c78-6dec-7595-bde9-99656b98280f",
  type: "page-type/service-cluster",
  slug: "git-transport-janitor",
  definition: "the job packing away what a push leaves in the repositories",
  resourceKind: "CronJob",
  namespace: "git",
  resourceName: "git-transport-janitor",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git",
  schedule: "*/15 * * * *",
  manifest: ["manifest/git-transport-janitor"],
  createdAt: "2026-09-07T15:24:22.380Z",
  updatedAt: "2026-10-27T07:41:05.138Z",
} as const satisfies ServiceCluster
