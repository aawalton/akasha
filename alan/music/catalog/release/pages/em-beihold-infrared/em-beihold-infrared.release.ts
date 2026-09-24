import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdInfrared = {
  id: "01a0676a-d721-7073-b502-a4598616b640",
  type: "page-type/release",
  slug: "em-beihold-infrared",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2017-05-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5v5Bvj4ujWgBwlNo6M1sEX",
      externalLink: "https://open.spotify.com/album/5v5Bvj4ujWgBwlNo6M1sEX",
    },
  ],
  title: "Infrared",
} as const satisfies Release
