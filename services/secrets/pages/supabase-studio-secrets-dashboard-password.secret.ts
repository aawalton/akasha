import type { Secret } from "../secret.page-type.types.ts"

export const supabaseStudioSecretsDashboardPassword = {
  id: "01a06832-cf2d-77cb-9923-39b29b9fe005",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "supabase-studio-secrets-dashboard-password",
  placements: [{ resourceName: "supabase-studio-secrets", resourceKey: "DASHBOARD_PASSWORD" }],
} as const satisfies Secret
