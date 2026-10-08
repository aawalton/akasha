import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const collectionsSecretsTraktClientId = {
  id: "01a076b8-0030-703a-a416-3d07a27e3895",
  type: "page-type/secret",
  slug: "collections-secrets-trakt-client-id",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "TRAKT_CLIENT_ID" }],
  createdAt: "2026-09-06T12:36:05.296Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
