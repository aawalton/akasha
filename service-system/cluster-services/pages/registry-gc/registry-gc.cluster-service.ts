import type { ClusterService } from "../../cluster-service.page-type.ts"

export const registryGc = {
  id: "01a06812-2380-70a7-a24a-bcc1429b9b1b",
  pageTypeSlug: "cluster-service",
  slug: "registry-gc",
  definition: "the job that removes an image layer nothing refers to",
  resourceKind: "CronJob",
  namespace: "registry",
  resourceName: "registry-gc",
  image: "registry.registry.svc.cluster.local:5000/cluster/ci:latest",
  schedule: "0 4 * * *",
  manifestCode:
    "akasha/service-system/cluster-services/pages/registry-gc/registry-gc.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
