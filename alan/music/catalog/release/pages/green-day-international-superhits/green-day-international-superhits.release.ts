import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayInternationalSuperhits = {
  id: "01a0676a-d721-7078-afbe-a59ef61fb942",
  type: "page-type/release",
  slug: "green-day-international-superhits",
  title: "International Superhits!",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 60.670767,
  ownProgress: 60.670767,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2001-11-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6HUIbDhzmqcwxrxUfTuHdW",
      externalLink: "https://open.spotify.com/album/6HUIbDhzmqcwxrxUfTuHdW",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
