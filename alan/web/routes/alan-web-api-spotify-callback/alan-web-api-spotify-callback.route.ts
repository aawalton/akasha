import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiSpotifyCallback = {
  id: "01a0882f-c3a9-73b3-a052-6e77f57ed79b",
  type: "page-type/route",
  slug: "alan-web-api-spotify-callback",
  definition: "the Spotify authorization code shown for pasting into the CLI",
  code: "ts",
  urlPath: "api/spotify/callback",
  createdAt: "2026-09-09T22:00:26.793Z",
  updatedAt: "2026-09-15T16:44:30.000Z",
} as const satisfies Route
