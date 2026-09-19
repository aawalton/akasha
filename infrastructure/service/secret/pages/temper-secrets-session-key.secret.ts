import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const temperSecretsSessionKey = {
  id: "01a0bb31-18aa-7a8e-a6cf-061fc19fa0c9",
  type: "page-type/secret",
  slug: "temper-secrets-session-key",
  placements: [{ resourceName: "temper-secrets", resourceKey: "TEMPER_SESSION_KEY" }],
} as const satisfies Secret
