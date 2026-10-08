import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsSpotifyClientId = {
  id: "01a076d8-38be-7fa5-9c43-d8a2a1adff0e",
  type: "page-type/secret",
  slug: "alanwalton-secrets-spotify-client-id",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "SPOTIFY_CLIENT_ID" }],
  createdAt: "2026-09-06T13:11:16.926Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
