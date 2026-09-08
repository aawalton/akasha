import type { Secret } from "../secret.page-type.ts"

export const pipelineEngineSecretsSupabaseServiceRoleKey = {
  id: "01a076b8-deab-718f-82c2-1ca92e06fdf7",
  pageTypeSlug: "secret",
  slug: "pipeline-engine-secrets-supabase-service-role-key",
  placements: [
    { resourceName: "collections-secrets", resourceKey: "SUPABASE_SERVICE_ROLE_KEY" },
    { resourceName: "alanwalton-secrets", resourceKey: "SUPABASE_SERVICE_ROLE_KEY" },
    { resourceName: "temper-secrets", resourceKey: "SUPABASE_SERVICE_ROLE_KEY" },
    { resourceName: "smilingjenny-secrets", resourceKey: "SUPABASE_SERVICE_ROLE_KEY" },
    { resourceName: "audhdalan-secrets", resourceKey: "SUPABASE_SERVICE_ROLE_KEY" },
  ],
} as const satisfies Secret
