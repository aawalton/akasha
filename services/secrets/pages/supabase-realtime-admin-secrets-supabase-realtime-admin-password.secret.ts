import type { Secret } from "../secret.page-type.ts"

export const supabaseRealtimeAdminSecretsSupabaseRealtimeAdminPassword = {
  id: "01a07699-fcc8-7fa7-b472-7fc397441e81",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "supabase-realtime-admin-secrets-supabase-realtime-admin-password",
  placements: [
    {
      resourceName: "supabase-realtime-admin-secrets",
      resourceKey: "SUPABASE_REALTIME_ADMIN_PASSWORD",
    },
  ],
} as const satisfies Secret
