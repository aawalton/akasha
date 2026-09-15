import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const musicalTheaterHamiltonOriginalBroadwayCastRecording = {
  id: "01a0676a-d71f-7041-ba9e-31f1366423a2",
  type: "release",
  slug: "musical-theater-hamilton-original-broadway-cast-recording",
  title: "Hamilton (Original Broadway Cast Recording)",
  partOfCollections: ["release-collection/musical-theater"],
  position: 0,
  ownLength: 142.595117,
  ownProgress: 142.595117,
  unit: "unit/minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2015-09-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kCHru7uhxBUdzkm4gzRQc",
      externalLink: "https://open.spotify.com/album/1kCHru7uhxBUdzkm4gzRQc",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
