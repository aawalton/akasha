import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxe = {
  id: "01a0676a-d71d-7028-a7a2-aec6bd4baa11",
  type: "page-type/release",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-03-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Csjy4XeA7KnizkhIvI7y2",
      externalLink: "https://open.spotify.com/album/5Csjy4XeA7KnizkhIvI7y2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "eternal sunshine (slightly deluxe)",
} as const satisfies Release
