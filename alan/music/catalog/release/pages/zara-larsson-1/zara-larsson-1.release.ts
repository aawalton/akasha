import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarsson1 = {
  id: "01a0676a-d714-7006-bc65-bbdf04e39803",
  type: "page-type/release",
  slug: "zara-larsson-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2014-10-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Rlo7Ga1Dmrx5cV4KOe4Fs",
      externalLink: "https://open.spotify.com/album/1Rlo7Ga1Dmrx5cV4KOe4Fs",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "1",
} as const satisfies Release
