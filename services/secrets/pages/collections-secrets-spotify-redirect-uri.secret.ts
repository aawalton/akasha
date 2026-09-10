import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsSpotifyRedirectUri = {
  id: "01a076b7-ed55-7661-9473-ff266ff29d00",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-spotify-redirect-uri",
  placements: [{ resourceName: "collections-secrets", resourceKey: "SPOTIFY_REDIRECT_URI" }],
} as const satisfies Secret
