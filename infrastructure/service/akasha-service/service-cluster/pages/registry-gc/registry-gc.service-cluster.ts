import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const registryGc = {
  id: "01a06812-2380-70a7-a24a-bcc1429b9b1b",
  type: "page-type/service-cluster",
  slug: "registry-gc",
  definition: "the job that removes an image layer nothing refers to",
  resourceKind: "CronJob",
  namespace: "registry",
  resourceName: "registry-gc",
  image: "registry.registry.svc.cluster.local:5000/cluster/ci",
  schedule: "0 4 * * *",
  manifest: ["manifest/registry-gc"],
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-10-27T07:41:05.138Z",
} as const satisfies ServiceCluster
