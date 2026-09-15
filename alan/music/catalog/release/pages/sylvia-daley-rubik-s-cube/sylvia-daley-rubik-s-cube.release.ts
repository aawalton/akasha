import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sylviaDaleyRubikSCube = {
  id: "01a0676a-d728-7027-a461-4c697de427cb",
  type: "page-type/release",
  slug: "sylvia-daley-rubik-s-cube",
  ownLength: 5.4916833333333335,
  ownProgress: 5.491683,
  partOfCollections: ["artist/sylvia-daley"],
  position: 0,
  publishedAt: "2025-06-13",
  rank: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Co8DW0X7Z0rCEgpZdjA55",
      externalLink: "https://open.spotify.com/album/6Co8DW0X7Z0rCEgpZdjA55",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Rubik's Cube",
} as const satisfies Release
