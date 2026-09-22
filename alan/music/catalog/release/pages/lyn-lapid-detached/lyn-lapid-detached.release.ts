import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidDetached = {
  id: "01a0676a-d71c-700e-87d6-9497f28de273",
  type: "page-type/release",
  slug: "lyn-lapid-detached",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2022-10-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gqvota2LkWgkoqEI51Q3U",
      externalLink: "https://open.spotify.com/album/7gqvota2LkWgkoqEI51Q3U",
    },
  ],
  title: "Detached",
} as const satisfies Release
