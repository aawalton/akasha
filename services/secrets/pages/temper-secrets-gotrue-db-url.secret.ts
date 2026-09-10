import type { Secret } from "../secret.page-type.types.ts"

export const temperSecretsGotrueDbUrl = {
  id: "01a076d8-38c0-73b3-9e2a-7c6108f65323",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "temper-secrets-gotrue-db-url",
  placements: [{ resourceName: "temper-secrets", resourceKey: "GOTRUE_DB_URL" }],
} as const satisfies Secret
