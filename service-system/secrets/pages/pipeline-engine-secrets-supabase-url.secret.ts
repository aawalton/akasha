import type { Secret } from "../secret.page-type.ts"

export const pipelineEngineSecretsSupabaseUrl = {
  id: "01a076b8-f1f6-79f8-88c0-1e0a407a7526",
  pageTypeSlug: "secret",
  slug: "pipeline-engine-secrets-supabase-url",
  placements: [
    { resourceName: "pipeline-engine-secrets", resourceKey: "SUPABASE_URL" },
    { resourceName: "collections-secrets", resourceKey: "SUPABASE_URL" },
  ],
} as const satisfies Secret
