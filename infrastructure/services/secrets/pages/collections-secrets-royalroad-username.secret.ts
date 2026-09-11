import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const collectionsSecretsRoyalroadUsername = {
  id: "01a076b7-6ea7-7e32-98df-26d00edeeaf2",
  type: "secret",
  slug: "collections-secrets-royalroad-username",
  placements: [{ resourceName: "collections-secrets", resourceKey: "ROYALROAD_USERNAME" }],
} as const satisfies Secret
