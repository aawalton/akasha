import type { ClusterService } from "../../cluster-service.page-type.ts"

export const supabaseRealtime = {
  id: "01a06812-2380-7fe4-8a55-3bb9b9dc3a52",
  pageTypeSlug: "cluster-service",
  slug: "supabase-realtime",
  definition: "the server that pushes a row's change to the browsers subscribed to it",
  resourceKind: "Deployment",
  namespace: "supabase-realtime",
  resourceName: "realtime",
  image: "supabase/realtime:v2.86.3",
  replicas: 1,
  containerPort: 4000,
  manifestCode:
    "service-system/cluster-services/pages/supabase-realtime/supabase-realtime.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
