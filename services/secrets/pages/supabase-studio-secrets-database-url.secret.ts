import type { Secret } from "../secret.page-type.types.ts"

export const supabaseStudioSecretsDatabaseUrl = {
  id: "01a06832-cf2d-708e-bb93-5dc6d58ee786",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "supabase-studio-secrets-database-url",
  placements: [
    { resourceName: "supabase-studio-secrets", resourceKey: "DATABASE_URL" },
    { resourceName: "postgres-secrets", resourceKey: "DATABASE_URL" },
  ],
} as const satisfies Secret
