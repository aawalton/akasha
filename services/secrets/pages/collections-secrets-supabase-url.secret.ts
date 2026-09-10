import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsSupabaseUrl = {
  id: "01a076b8-f1f6-79f8-88c0-1e0a407a7526",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-supabase-url",
  placements: [
    { resourceName: "collections-secrets", resourceKey: "SUPABASE_URL" },
    { resourceName: "alanwalton-secrets", resourceKey: "SUPABASE_URL" },
    { resourceName: "temper-secrets", resourceKey: "SUPABASE_URL" },
    { resourceName: "smilingjenny-secrets", resourceKey: "SUPABASE_URL" },
    { resourceName: "audhdalan-secrets", resourceKey: "SUPABASE_URL" },
  ],
} as const satisfies Secret
