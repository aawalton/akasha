import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const gitTransportJanitor = {
  id: "01a07c78-6dec-7595-bde9-99656b98280f",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "git-transport-janitor",
  definition: "the job clearing the debris an aborted push leaves in the repositories",
  resourceKind: "CronJob",
  namespace: "git",
  resourceName: "git-transport-janitor",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  schedule: "0 * * * *",
  manifest: "git-transport-janitor",
} as const satisfies ClusterService
