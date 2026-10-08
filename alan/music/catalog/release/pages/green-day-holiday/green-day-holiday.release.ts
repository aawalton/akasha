import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayHoliday = {
  id: "01a0676a-d720-704c-8092-dcfb0e43acab",
  type: "page-type/release",
  slug: "green-day-holiday",
  title: "Holiday",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 9.901767,
  ownProgress: 9.901767,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2005-03-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1SPzhFzjXrz9OXLP2rKg1C",
      externalLink: "https://open.spotify.com/album/1SPzhFzjXrz9OXLP2rKg1C",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
