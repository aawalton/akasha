import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsTraktClientId = {
  id: "01a076b8-0030-703a-a416-3d07a27e3895",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-trakt-client-id",
  placements: [
    { resourceName: "collections-secrets", resourceKey: "TRAKT_CLIENT_ID" },
    { resourceName: "alanwalton-secrets", resourceKey: "TRAKT_CLIENT_ID" },
  ],
} as const satisfies Secret
