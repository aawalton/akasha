import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const collectionsSecretsTraktClientId = {
  id: "01a076b8-0030-703a-a416-3d07a27e3895",
  type: "secret",
  slug: "collections-secrets-trakt-client-id",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "TRAKT_CLIENT_ID" }],
} as const satisfies Secret
