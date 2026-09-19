import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsSessionKey = {
  id: "01a0baef-dfe9-795c-864e-0fadecf7baf6",
  type: "page-type/secret",
  slug: "alanwalton-secrets-session-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "ALANWALTON_SESSION_KEY" }],
} as const satisfies Secret
