import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsAdminUserId = {
  id: "01a076d8-38b5-71d5-b817-b94f7e9aec4e",
  type: "page-type/secret",
  slug: "alanwalton-secrets-admin-user-id",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "ADMIN_USER_ID" }],
} as const satisfies Secret
