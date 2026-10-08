import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const justinTimberlakeManOfTheWoods = {
  id: "01a0676a-d724-7032-b604-33546e4ff81d",
  type: "page-type/release",
  slug: "justin-timberlake-man-of-the-woods",
  title: "Man of the Woods",
  partOfCollections: ["artist/justin-timberlake"],
  position: 0,
  ownLength: 66.045667,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-02-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "01l3jTY261V3CESZR4dABz",
      externalLink: "https://open.spotify.com/album/01l3jTY261V3CESZR4dABz",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
