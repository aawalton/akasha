import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayUpUp = {
  id: "01a0676a-d72f-7055-aeac-61973012f953",
  type: "page-type/release",
  slug: "coldplay-up-up",
  title: "Up&Up",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 3.968217,
  ownProgress: 3.968217,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-04-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39CemyWzo6fJbvbAyICDrj",
      externalLink: "https://open.spotify.com/album/39CemyWzo6fJbvbAyICDrj",
    },
  ],
} as const satisfies Release
