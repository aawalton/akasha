import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsSpotifyClientSecret = {
  id: "01a076d8-38be-7968-a644-cc1d0637b869",
  type: "page-type/secret",
  slug: "alanwalton-secrets-spotify-client-secret",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "SPOTIFY_CLIENT_SECRET" }],
  createdAt: "2026-09-06T13:11:16.926Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
