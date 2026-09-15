import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacer11 = {
  id: "01a0676a-d714-7008-8d51-d2b7221dd251",
  type: "page-type/release",
  slug: "jada-facer-1-1",
  title: "1+1",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.222933,
  ownProgress: 3.222933,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-02-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0502CRnM53gVTkyfIjxksi",
      externalLink: "https://open.spotify.com/album/0502CRnM53gVTkyfIjxksi",
    },
  ],
} as const satisfies Release
