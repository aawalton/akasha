import type { Secret } from "../secret.page-type.ts"

export const alanwaltonSecretsAdminUserId = {
  id: "01a076d8-38b5-71d5-b817-b94f7e9aec4e",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "alanwalton-secrets-admin-user-id",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "ADMIN_USER_ID" }],
} as const satisfies Secret
