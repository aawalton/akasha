import type { ClusterService } from "../../cluster-service.page-type.ts"

export const supabaseStudio = {
  id: "01a06812-2381-7a04-b2a9-03ddb9048a47",
  pageTypeSlug: "cluster-service",
  slug: "supabase-studio",
  definition: "the interface the database is read and edited through",
  resourceKind: "Deployment",
  namespace: "supabase-studio",
  resourceName: "supabase-studio",
  image: "supabase/studio:2026.04.08-sha-205cbe7",
  replicas: 1,
  containerPort: 3000,
  manifestCode:
    "akasha/service-system/cluster-services/pages/supabase-studio/supabase-studio.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
