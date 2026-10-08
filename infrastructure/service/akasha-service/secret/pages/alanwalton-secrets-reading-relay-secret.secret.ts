import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsReadingRelaySecret = {
  id: "01a076d8-38bd-73ac-82e0-6c3bbbf22748",
  type: "page-type/secret",
  slug: "alanwalton-secrets-reading-relay-secret",
  placements: [
    { resourceName: "alanwalton-secrets", resourceKey: "READING_RELAY_SECRET" },
    { resourceName: "smilingjenny-secrets", resourceKey: "READING_RELAY_SECRET" },
  ],
  createdAt: "2026-09-06T13:11:16.925Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
