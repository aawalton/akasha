import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const registry = {
  id: "01a06812-2380-78aa-994b-e27680b0a2eb",
  type: "page-type/service-cluster",
  slug: "registry",
  definition: "the store with the images the cluster runs",
  resourceKind: "Deployment",
  namespace: "registry",
  resourceName: "registry",
  image: "registry:3.0.0",
  replicas: 1,
  containerPort: 5000,
  manifest: ["manifest/registry"],
  createdAt: "2026-09-03T16:20:14.336Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceCluster
