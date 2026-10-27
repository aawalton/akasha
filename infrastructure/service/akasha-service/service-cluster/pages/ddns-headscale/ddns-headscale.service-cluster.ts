import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const ddnsHeadscale = {
  id: "01a06812-2380-7daf-80c0-b50676a5feef",
  type: "page-type/service-cluster",
  slug: "ddns-headscale",
  definition: "the job that points a public name at the current address",
  resourceKind: "CronJob",
  namespace: "ddns-headscale",
  resourceName: "ddns-headscale",
  image: "registry.registry.svc.cluster.local:5000/cluster/ci",
  schedule: "*/5 * * * *",
  manifest: ["manifest/ddns-headscale"],
  secrets: ["secret/cloudflare-api-token"],
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-10-27T07:41:05.138Z",
} as const satisfies ServiceCluster
