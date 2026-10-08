import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const temperSecretsSessionKey = {
  id: "01a0bb31-18aa-7a8e-a6cf-061fc19fa0c9",
  type: "page-type/secret",
  slug: "temper-secrets-session-key",
  placements: [{ resourceName: "temper-secrets", resourceKey: "TEMPER_SESSION_KEY" }],
  createdAt: "2026-09-19T19:42:32.106Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
