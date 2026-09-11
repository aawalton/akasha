import type { ServiceCluster } from "akasha/infrastructure/services/clusters/service-cluster.page-type.types.ts"

export const gotrue = {
  id: "01a06812-2380-7106-9c4f-27bad81011ae",
  type: "service-cluster",
  slug: "gotrue",
  definition: "the server that issues and refuses the tokens a person is known by",
  resourceKind: "Deployment",
  namespace: "gotrue",
  resourceName: "gotrue",
  image: "supabase/auth:v2.188.1",
  replicas: 1,
  containerPort: 9999,
  manifest: "gotrue",
} as const satisfies ServiceCluster
