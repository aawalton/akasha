import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeAndAlsoLive = {
  id: "01a0676a-d71d-7029-8c75-a551fc6c33e5",
  type: "page-type/release",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-10-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3L2iweH45rVdTBPldbY6dp",
      externalLink: "https://open.spotify.com/album/3L2iweH45rVdTBPldbY6dp",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "eternal sunshine (slightly deluxe and also live)",
} as const satisfies Release
