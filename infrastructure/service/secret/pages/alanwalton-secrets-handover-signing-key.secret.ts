import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsHandoverSigningKey = {
  id: "01a0bb3b-7535-720d-8a65-0de7467999ac",
  type: "page-type/secret",
  slug: "alanwalton-secrets-handover-signing-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "HANDOVER_SIGNING_KEY" }],
} as const satisfies Secret
