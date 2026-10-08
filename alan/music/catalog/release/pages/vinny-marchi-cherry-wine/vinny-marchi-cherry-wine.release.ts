import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiCherryWine = {
  id: "01a0676a-d71a-7029-8cbf-d5839324aeff",
  type: "page-type/release",
  slug: "vinny-marchi-cherry-wine",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-06-30",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5pDd4MwxE21AHV6mnAHFqA",
      externalLink: "https://open.spotify.com/album/5pDd4MwxE21AHV6mnAHFqA",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Cherry Wine",
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
