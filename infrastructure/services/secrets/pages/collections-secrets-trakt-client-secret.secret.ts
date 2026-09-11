import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const collectionsSecretsTraktClientSecret = {
  id: "01a076b8-124d-76ce-a0f0-999991d61492",
  type: "secret",
  slug: "collections-secrets-trakt-client-secret",
  placements: [{ resourceName: "collections-secrets", resourceKey: "TRAKT_CLIENT_SECRET" }],
} as const satisfies Secret
