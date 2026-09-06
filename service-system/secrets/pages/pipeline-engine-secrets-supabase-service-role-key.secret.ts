import type { Secret } from "../secret.page-type.ts"

export const pipelineEngineSecretsSupabaseServiceRoleKey = {
  id: "01a076b8-deab-718f-82c2-1ca92e06fdf7",
  pageTypeSlug: "secret",
  slug: "pipeline-engine-secrets-supabase-service-role-key",
  placements: [
    { resourceName: "pipeline-engine-secrets", resourceKey: "ALANWALTON_SERVICE_ROLE_KEY" },
    { resourceName: "pipeline-engine-secrets", resourceKey: "SUPABASE_SERVICE_ROLE_KEY" },
    { resourceName: "collections-secrets", resourceKey: "SUPABASE_SERVICE_ROLE_KEY" },
  ],
} as const satisfies Secret
