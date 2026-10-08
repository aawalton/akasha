import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsHandoverSigningKey = {
  id: "01a0bb3b-7535-720d-8a65-0de7467999ac",
  type: "page-type/secret",
  slug: "alanwalton-secrets-handover-signing-key",
  placements: [{ resourceName: "alanwalton-login-secrets", resourceKey: "HANDOVER_SIGNING_KEY" }],
  createdAt: "2026-09-19T19:53:51.157Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
