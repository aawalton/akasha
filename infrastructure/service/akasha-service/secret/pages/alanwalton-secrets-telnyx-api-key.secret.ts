import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsTelnyxApiKey = {
  id: "01a16fae-6059-7d09-b9ba-66f7d96ebf45",
  type: "page-type/secret",
  slug: "alanwalton-secrets-telnyx-api-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "TELNYX_API_KEY" }],
  createdAt: "2026-10-24T20:51:01.335Z",
  updatedAt: "2026-10-24T20:51:01.335Z",
} as const satisfies Secret
