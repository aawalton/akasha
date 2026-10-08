import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsTelnyxPublicKey = {
  id: "01a076d8-38be-7503-85a3-c2f8302069cb",
  type: "page-type/secret",
  slug: "alanwalton-secrets-telnyx-public-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "TELNYX_PUBLIC_KEY" }],
  createdAt: "2026-09-06T13:11:16.926Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
