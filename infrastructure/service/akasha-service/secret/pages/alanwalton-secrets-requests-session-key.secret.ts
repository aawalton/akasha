import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsRequestsSessionKey = {
  id: "01a0c537-bbc8-78df-a0d5-f7909c374f0c",
  type: "page-type/secret",
  slug: "alanwalton-secrets-requests-session-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "REQUESTS_SESSION_KEY" }],
} as const satisfies Secret
