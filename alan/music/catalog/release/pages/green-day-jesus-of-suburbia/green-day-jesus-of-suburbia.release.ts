import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayJesusOfSuburbia = {
  id: "01a0676a-d722-7024-ba54-ab0b9b13dd6a",
  type: "page-type/release",
  slug: "green-day-jesus-of-suburbia",
  title: "Jesus of Suburbia",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 12.2471,
  ownProgress: 12.2471,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2005-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0spxpyVFpjqxb5mQbjYbVl",
      externalLink: "https://open.spotify.com/album/0spxpyVFpjqxb5mQbjYbVl",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
