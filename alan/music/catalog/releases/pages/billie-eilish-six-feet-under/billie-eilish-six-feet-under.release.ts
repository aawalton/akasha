import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const billieEilishSixFeetUnder = {
  id: "01a0676a-d729-7013-9a12-da54992f94ef",
  type: "release",
  slug: "billie-eilish-six-feet-under",
  title: "Six Feet Under",
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  ownLength: 3.160217,
  ownProgress: 3.160217,
  unit: "unit/minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2016-11-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "74TRp3O8BRdGxc0XO0UzoY",
      externalLink: "https://open.spotify.com/album/74TRp3O8BRdGxc0XO0UzoY",
    },
  ],
} as const satisfies Release
