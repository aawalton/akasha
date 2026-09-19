import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsAtlasSessionKey = {
  id: "01a0bb2d-8019-7fec-aaaa-5863bc34dac0",
  type: "page-type/secret",
  slug: "alanwalton-secrets-atlas-session-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "ATLAS_SESSION_KEY" }],
} as const satisfies Secret
