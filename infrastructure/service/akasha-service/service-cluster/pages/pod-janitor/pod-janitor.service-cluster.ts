import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const podJanitor = {
  id: "01a06812-2380-7b30-8877-d7c4a1d5411c",
  type: "page-type/service-cluster",
  slug: "pod-janitor",
  definition: "the job that removes a failed pod its controller left behind",
  resourceKind: "CronJob",
  namespace: "pod-janitor",
  resourceName: "pod-janitor",
  image: "registry.registry.svc.cluster.local:5000/cluster/ci",
  schedule: "0 */6 * * *",
  manifest: ["manifest/pod-janitor"],
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-10-27T07:41:05.138Z",
} as const satisfies ServiceCluster
