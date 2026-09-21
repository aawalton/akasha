import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeWickedForGoodTheSoundtrack = {
  id: "01a0676a-d731-7016-a001-e35f1a516ba5",
  type: "page-type/release",
  slug: "ariana-grande-wicked-for-good-the-soundtrack",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2025-11-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6pamCzTowX31m57z8dC1Sk",
      externalLink: "https://open.spotify.com/album/6pamCzTowX31m57z8dC1Sk",
      lastSyncedAt: "2026-01-18",
    },
  ],
  title: "Wicked: For Good – The Soundtrack",
} as const satisfies Release
