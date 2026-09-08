import type { Secret } from "../secret.page-type.ts"

export const supabaseAuthAdminSecretsSupabaseAuthAdminPassword = {
  id: "01a07697-c5f2-7a37-b06c-e4346fc595fa",
  pageTypeSlug: "secret",
  slug: "supabase-auth-admin-secrets-supabase-auth-admin-password",
  placements: [
    { resourceName: "supabase-auth-admin-secrets", resourceKey: "SUPABASE_AUTH_ADMIN_PASSWORD" },
  ],
} as const satisfies Secret
