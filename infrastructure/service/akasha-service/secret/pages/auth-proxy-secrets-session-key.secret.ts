import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const authProxySecretsSessionKey = {
  id: "01a0c434-ad78-7d0a-bbb8-a87b667fc24a",
  type: "page-type/secret",
  slug: "auth-proxy-secrets-session-key",
  placements: [{ resourceName: "auth-proxy-secrets", resourceKey: "AUTH_PROXY_SESSION_KEY" }],
  createdAt: "2026-09-21T13:43:01.752Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
