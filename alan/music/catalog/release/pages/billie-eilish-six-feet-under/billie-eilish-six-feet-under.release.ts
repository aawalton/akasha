import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishSixFeetUnder = {
  id: "01a0676a-d729-7013-9a12-da54992f94ef",
  type: "page-type/release",
  slug: "billie-eilish-six-feet-under",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2016-11-17",
  grade: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "74TRp3O8BRdGxc0XO0UzoY",
      externalLink: "https://open.spotify.com/album/74TRp3O8BRdGxc0XO0UzoY",
    },
  ],
  title: "Six Feet Under",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
