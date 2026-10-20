import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaDistractions = {
  id: "01a0676a-d71c-7016-b712-3376a2c9817e",
  type: "page-type/release",
  slug: "sia-distractions",
  title: "Distractions",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2002-03-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0LnqF2lMc6fB0VSuVy9W6R",
      externalLink: "https://open.spotify.com/album/0LnqF2lMc6fB0VSuVy9W6R",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
