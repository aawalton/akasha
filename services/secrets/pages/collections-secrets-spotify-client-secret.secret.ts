import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsSpotifyClientSecret = {
  id: "01a076b7-da96-7385-9bcb-b221ccc42cce",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-spotify-client-secret",
  placements: [{ resourceName: "collections-secrets", resourceKey: "SPOTIFY_CLIENT_SECRET" }],
} as const satisfies Secret
