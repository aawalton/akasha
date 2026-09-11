import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const realtimeSecretsApiJwtSecret = {
  id: "01a07699-9fc1-7678-b91d-ef6a1a22b047",
  type: "secret",
  slug: "realtime-secrets-api-jwt-secret",
  placements: [{ resourceName: "realtime-secrets", resourceKey: "API_JWT_SECRET" }],
} as const satisfies Secret
