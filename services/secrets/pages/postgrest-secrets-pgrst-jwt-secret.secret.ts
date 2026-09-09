import type { Secret } from "../secret.page-type.ts"

export const postgrestSecretsPgrstJwtSecret = {
  id: "01a07697-6c3e-787b-b79b-e36bb2224985",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "postgrest-secrets-pgrst-jwt-secret",
  placements: [{ resourceName: "postgrest-secrets", resourceKey: "PGRST_JWT_SECRET" }],
} as const satisfies Secret
