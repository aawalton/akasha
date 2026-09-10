import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const supabaseRealtime = {
  id: "01a06812-2380-7fe4-8a55-3bb9b9dc3a52",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "supabase-realtime",
  definition: "the server that pushes a row's change to the browsers subscribed to it",
  resourceKind: "Deployment",
  namespace: "supabase-realtime",
  resourceName: "realtime",
  image: "supabase/realtime:v2.86.3",
  replicas: 1,
  containerPort: 4000,
  manifest: "supabase-realtime",
  secrets: [
    "secret/realtime-secrets-database-url",
    "secret/realtime-secrets-db-enc-key",
    "secret/realtime-secrets-api-jwt-secret",
    "secret/realtime-secrets-secret-key-base",
    "secret/realtime-secrets-metrics-jwt-secret",
  ],
} as const satisfies ClusterService
