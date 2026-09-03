import type { ClusterService } from "../../cluster-service.page-type.ts"

export const ddnsHeadscale = {
  id: "01a06812-2380-7daf-80c0-b50676a5feef",
  pageTypeSlug: "cluster-service",
  slug: "ddns-headscale",
  definition: "the job that points a public name at the current address",
  resourceKind: "CronJob",
  namespace: "ddns-headscale",
  resourceName: "ddns-headscale",
  image: "registry.registry.svc.cluster.local:5000/cluster/ci:latest",
  schedule: "*/5 * * * *",
  manifestCode:
    "akasha/service-system/cluster-services/pages/ddns-headscale/ddns-headscale.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
