import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const archiveOfWorldsSecretsNextPublicSupabaseAnonKey = {
  id: "01a076d8-38bf-7451-8a54-9024fb89e4a6",
  type: "secret",
  slug: "archive-of-worlds-secrets-next-public-supabase-anon-key",
  placements: [
    { resourceName: "archive-of-worlds-secrets", resourceKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY" },
  ],
} as const satisfies Secret
