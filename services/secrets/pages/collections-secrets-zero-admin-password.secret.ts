import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsZeroAdminPassword = {
  id: "01a076b8-753c-7d2b-8e17-c96e316e561d",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-zero-admin-password",
  placements: [{ resourceName: "collections-secrets", resourceKey: "ZERO_ADMIN_PASSWORD" }],
} as const satisfies Secret
