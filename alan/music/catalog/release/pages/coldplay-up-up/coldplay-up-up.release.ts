import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayUpUp = {
  id: "01a0676a-d72f-7055-aeac-61973012f953",
  type: "page-type/release",
  slug: "coldplay-up-up",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2016-04-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39CemyWzo6fJbvbAyICDrj",
      externalLink: "https://open.spotify.com/album/39CemyWzo6fJbvbAyICDrj",
    },
  ],
  title: "Up&Up",
} as const satisfies Release
