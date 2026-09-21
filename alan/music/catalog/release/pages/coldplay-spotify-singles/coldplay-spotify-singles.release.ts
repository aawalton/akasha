import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplaySpotifySingles = {
  id: "01a0676a-d72a-7001-a90f-b174fb9ec9b2",
  type: "page-type/release",
  slug: "coldplay-spotify-singles",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2022-02-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WSVBLmTp6Fgjm2Dwyu3vr",
      externalLink: "https://open.spotify.com/album/5WSVBLmTp6Fgjm2Dwyu3vr",
    },
  ],
  title: "Spotify Singles",
} as const satisfies Release
