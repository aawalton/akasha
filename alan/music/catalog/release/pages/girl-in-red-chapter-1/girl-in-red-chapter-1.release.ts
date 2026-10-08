import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const girlInRedChapter1 = {
  id: "01a0676a-d71a-7017-a365-89e43ce71982",
  type: "page-type/release",
  slug: "girl-in-red-chapter-1",
  title: "chapter 1",
  partOfCollections: ["artist/girl-in-red"],
  position: 0,
  ownLength: 13.4774,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-09-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "51Uj40nCUuHggkIUEMywOr",
      externalLink: "https://open.spotify.com/album/51Uj40nCUuHggkIUEMywOr",
    },
  ],
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-09-15T16:35:36.000Z",
} as const satisfies Release
