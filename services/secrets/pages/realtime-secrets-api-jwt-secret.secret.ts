import type { Secret } from "../secret.page-type.ts"

export const realtimeSecretsApiJwtSecret = {
  id: "01a07699-9fc1-7678-b91d-ef6a1a22b047",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "realtime-secrets-api-jwt-secret",
  placements: [{ resourceName: "realtime-secrets", resourceKey: "API_JWT_SECRET" }],
} as const satisfies Secret
