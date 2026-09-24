import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const smilingjennySecretsSessionKey = {
  id: "01a0c1e0-1a44-7c11-9d3e-6b2f5a0d84c7",
  type: "page-type/secret",
  slug: "smilingjenny-secrets-session-key",
  placements: [{ resourceName: "smilingjenny-secrets", resourceKey: "SMILINGJENNY_SESSION_KEY" }],
} as const satisfies Secret
