import type { ClusterService } from "../../cluster-service.page-type.ts"

export const registryGc = {
  id: "01a06812-2380-70a7-a24a-bcc1429b9b1b",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "registry-gc",
  definition: "the job that removes an image layer nothing refers to",
  resourceKind: "CronJob",
  namespace: "registry",
  resourceName: "registry-gc",
  image: "registry.registry.svc.cluster.local:5000/cluster/ci:latest",
  schedule: "0 4 * * *",
  manifest: "registry-gc",
} as const satisfies ClusterService
