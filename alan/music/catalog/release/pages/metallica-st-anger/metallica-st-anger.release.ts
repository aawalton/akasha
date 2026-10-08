import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaStAnger = {
  id: "01a0676a-d72a-700e-903c-ef93bae714a5",
  type: "page-type/release",
  slug: "metallica-st-anger",
  title: "St. Anger",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 75.04215,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-06-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ljK2LVKvEPd5xPgUJn0Bs",
      externalLink: "https://open.spotify.com/album/4ljK2LVKvEPd5xPgUJn0Bs",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-15T16:38:20.000Z",
} as const satisfies Release
