import type { Secret } from "../secret.page-type.types.ts"

export const alanwaltonSecretsSpotifyClientSecret = {
  id: "01a076d8-38be-7968-a644-cc1d0637b869",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "alanwalton-secrets-spotify-client-secret",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "SPOTIFY_CLIENT_SECRET" }],
} as const satisfies Secret
