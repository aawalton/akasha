import type { ServiceCluster } from "akasha/infrastructure/service/cluster/service-cluster.page-type.types.ts"

export const seaweedfsMaintenance = {
  id: "01a06816-68b2-73ad-b106-fece69b13da9",
  type: "page-type/service-cluster",
  slug: "seaweedfs-maintenance",
  definition: "what rebalances and compacts the volumes holding files",
  resourceKind: "CronJob",
  namespace: "seaweedfs-maintenance",
  resourceName: "seaweedfs-maintenance",
  image: "chrislusf/seaweedfs:3.73",
  schedule: "43 6 * * 0",
  manifest: ["manifest/seaweedfs-maintenance"],
} as const satisfies ServiceCluster
