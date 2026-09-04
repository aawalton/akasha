import type { ClusterService } from "../../cluster-service.page-type.ts"

export const gotrue = {
  id: "01a06812-2380-7106-9c4f-27bad81011ae",
  pageTypeSlug: "cluster-service",
  slug: "gotrue",
  definition: "the server that issues and refuses the tokens a person is known by",
  resourceKind: "Deployment",
  namespace: "gotrue",
  resourceName: "gotrue",
  image: "supabase/auth:v2.188.1",
  replicas: 1,
  containerPort: 9999,
  manifestCode:
    "service-system/cluster-services/pages/gotrue/gotrue.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
