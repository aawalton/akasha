import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsSpotifyClientId = {
  id: "01a076b7-c85f-7513-97c6-8b551e181823",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-spotify-client-id",
  placements: [{ resourceName: "collections-secrets", resourceKey: "SPOTIFY_CLIENT_ID" }],
} as const satisfies Secret
