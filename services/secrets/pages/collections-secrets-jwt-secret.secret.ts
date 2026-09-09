import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsJwtSecret = {
  id: "01a076b6-9349-7b5a-b8f8-d780de29be90",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-jwt-secret",
  placements: [
    { resourceName: "collections-secrets", resourceKey: "JWT_SECRET" },
    { resourceName: "collections-secrets", resourceKey: "ZERO_AUTH_SECRET" },
    { resourceName: "alanwalton-secrets", resourceKey: "JWT_SECRET" },
    { resourceName: "temper-secrets", resourceKey: "JWT_SECRET" },
    { resourceName: "temper-secrets", resourceKey: "ZERO_AUTH_SECRET" },
  ],
} as const satisfies Secret
