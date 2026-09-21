import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLiveFromSpotifyLondon = {
  id: "01a0676a-d723-704c-a535-e0f44163bd9c",
  type: "page-type/release",
  slug: "coldplay-live-from-spotify-london",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2016-12-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "573eP6oKtAJDqnpco7Fn9c",
      externalLink: "https://open.spotify.com/album/573eP6oKtAJDqnpco7Fn9c",
    },
  ],
  title: "Live from Spotify London",
} as const satisfies Release
