import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineStupidCupid = {
  id: "01a0676a-d72a-7037-b394-09c3c7bff6dc",
  type: "page-type/release",
  slug: "jenna-raine-stupid-cupid",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2023-03-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5L3H6uXdvsSUkgSZTeU3fv",
      externalLink: "https://open.spotify.com/album/5L3H6uXdvsSUkgSZTeU3fv",
    },
  ],
  title: "Stupid Cupid",
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
