import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const ddnsHeadscale = {
  id: "01a06812-2380-7daf-80c0-b50676a5feef",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "ddns-headscale",
  definition: "the job that points a public name at the current address",
  resourceKind: "CronJob",
  namespace: "ddns-headscale",
  resourceName: "ddns-headscale",
  image: "registry.registry.svc.cluster.local:5000/cluster/ci:latest",
  schedule: "*/5 * * * *",
  manifest: "ddns-headscale",
} as const satisfies ServiceCluster
