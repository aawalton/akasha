import type { Secret } from "../secret.page-type.ts"

export const temperSecretsZeroAdminPassword = {
  id: "01a076d8-38c1-77b4-b8b9-b9e804daa955",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "temper-secrets-zero-admin-password",
  placements: [{ resourceName: "temper-secrets", resourceKey: "ZERO_ADMIN_PASSWORD" }],
} as const satisfies Secret
