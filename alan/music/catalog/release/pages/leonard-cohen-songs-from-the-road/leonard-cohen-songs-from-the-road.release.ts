import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenSongsFromTheRoad = {
  id: "01a0676a-d729-7066-8f1d-58103664349c",
  type: "page-type/release",
  slug: "leonard-cohen-songs-from-the-road",
  title: "Songs From The Road",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 67.2717,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-09-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2gyoqhcdYUTxcgYxZQbFOD",
      externalLink: "https://open.spotify.com/album/2gyoqhcdYUTxcgYxZQbFOD",
      lastSyncedAt: "2025-10-10",
    },
  ],
} as const satisfies Release
