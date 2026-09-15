import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenHallelujahSongsFromHisAlbums = {
  id: "01a0676a-d71f-703c-91c0-ac02dac24708",
  type: "page-type/release",
  slug: "leonard-cohen-hallelujah-songs-from-his-albums",
  title: "Hallelujah & Songs from His Albums",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 76.02745,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-06-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ZSKPKsorX97OZfuWQCa8x",
      externalLink: "https://open.spotify.com/album/0ZSKPKsorX97OZfuWQCa8x",
      lastSyncedAt: "2025-10-10",
    },
  ],
} as const satisfies Release
