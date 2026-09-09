import type { Route } from "@akasha/code/route"

export const alanWebApiSpotifyCallback = {
  id: "01a0882f-c3a9-73b3-a052-6e77f57ed79b",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-spotify-callback",
  definition: "the Spotify authorization code shown for pasting into the CLI",
  code: "ts",
  urlPath: "api/spotify/callback",
} as const satisfies Route
