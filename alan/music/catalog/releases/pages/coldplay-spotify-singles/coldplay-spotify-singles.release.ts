import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const coldplaySpotifySingles = {
  id: "01a0676a-d72a-7001-a90f-b174fb9ec9b2",
  type: "release",
  slug: "coldplay-spotify-singles",
  title: "Spotify Singles",
  partOfCollections: ["coldplay"],
  position: 0,
  ownLength: 8.366933,
  ownProgress: 8.366933,
  unit: "minutes",
  status: "completed",
  publishedAt: "2022-02-23",
  externalId: "5WSVBLmTp6Fgjm2Dwyu3vr",
  externalLink: "https://open.spotify.com/album/5WSVBLmTp6Fgjm2Dwyu3vr",
} as const satisfies Release
