import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxe = {
  id: "01a0676a-d725-7026-a2ae-d9b9018fb558",
  type: "page-type/release",
  slug: "ariana-grande-my-everything-deluxe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2014-08-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6EVYTRG1drKdO8OnIQBeEj",
      externalLink: "https://open.spotify.com/album/6EVYTRG1drKdO8OnIQBeEj",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "My Everything (Deluxe)",
} as const satisfies Release
