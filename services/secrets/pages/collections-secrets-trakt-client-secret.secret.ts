import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsTraktClientSecret = {
  id: "01a076b8-124d-76ce-a0f0-999991d61492",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-trakt-client-secret",
  placements: [{ resourceName: "collections-secrets", resourceKey: "TRAKT_CLIENT_SECRET" }],
} as const satisfies Secret
