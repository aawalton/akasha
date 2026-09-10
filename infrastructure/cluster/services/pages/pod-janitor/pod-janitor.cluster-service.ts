import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const podJanitor = {
  id: "01a06812-2380-7b30-8877-d7c4a1d5411c",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "pod-janitor",
  definition: "the job that removes a failed pod its controller left behind",
  resourceKind: "CronJob",
  namespace: "pod-janitor",
  resourceName: "pod-janitor",
  image: "registry.registry.svc.cluster.local:5000/cluster/ci:latest",
  schedule: "0 */6 * * *",
  manifest: "pod-janitor",
} as const satisfies ClusterService
