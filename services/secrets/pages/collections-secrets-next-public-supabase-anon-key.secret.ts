import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsNextPublicSupabaseAnonKey = {
  id: "01a076b6-a686-738e-b5d6-c8b2e80ecb84",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-next-public-supabase-anon-key",
  placements: [
    { resourceName: "collections-secrets", resourceKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
    { resourceName: "alanwalton-secrets", resourceKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
    { resourceName: "temper-secrets", resourceKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
    { resourceName: "smilingjenny-secrets", resourceKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
  ],
} as const satisfies Secret
